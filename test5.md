Spring BootでMyBatisを使用し、PostgreSQLのマスター・レプリカ構成でフェイルオーバーとフェイルバックを実現するためには、以下の手順を実行します。これには、複数のDataSourceを設定し、カスタムのルーティングロジックを実装する必要があります。

1. 複数のDataSourceを設定  
まず、マスターとレプリカのDataSourceを設定します。

```
spring:
  datasource:
    master:
      url: jdbc:postgresql://master-db-host:5432/your_database
      username: your_username
      password: your_password
      driver-class-name: org.postgresql.Driver
    replica:
      url: jdbc:postgresql://replica-db-host:5432/your_database
      username: your_username
      password: your_password
      driver-class-name: org.postgresql.Driver
```

application.ymlの設定例
2. DataSourceの設定  
次に、マスターとレプリカのDataSourceを設定し、ルーティングDataSourceを作成します。

DataSourceConfig.java

```
package com.example.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.jdbc.datasource.lookup.DataSourceLookupFailureException;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DataSourceConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.master")
    public DataSource masterDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.replica")
    public DataSource replicaDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public DataSource routingDataSource(@Qualifier("masterDataSource") DataSource masterDataSource,
                                        @Qualifier("replicaDataSource") DataSource replicaDataSource) {
        RoutingDataSource routingDataSource = new RoutingDataSource();
        Map<Object, Object> dataSourceMap = new HashMap<>();
        dataSourceMap.put("master", masterDataSource);
        dataSourceMap.put("replica", replicaDataSource);
        routingDataSource.setTargetDataSources(dataSourceMap);
        routingDataSource.setDefaultTargetDataSource(masterDataSource);
        return routingDataSource;
    }

    public class RoutingDataSource extends AbstractRoutingDataSource {
        @Override
        protected Object determineCurrentLookupKey() {
            return DataSourceContextHolder.getDataSourceType();
        }
    }
}
```

3. DataSourceContextHolderの実装  
現在のデータソースの種類を保持するためのコンテキストホルダーを実装します。

DataSourceContextHolder.java

```
package com.example.config;

public class DataSourceContextHolder {

    private static final ThreadLocal<String> contextHolder = new ThreadLocal<>();

    public static void setDataSourceType(String dataSourceType) {
        contextHolder.set(dataSourceType);
    }

    public static String getDataSourceType() {
        return contextHolder.get();
    }

    public static void clearDataSourceType() {
        contextHolder.remove();
    }
}
```

4. フェイルオーバーとフェイルバックのロジック  
レプリカが障害発生時にマスターに切り替え、レプリカが復旧した場合にレプリカに切り戻すロジックを実装します。ここでは、簡単な例として、レプリカへの接続が失敗した場合にマスターに切り替える方法を示します。

RoutingDataSource.javaの修正

```
public class RoutingDataSource extends AbstractRoutingDataSource {
    private boolean replicaAvailable = true;

    @Override
    protected Object determineCurrentLookupKey() {
        if (replicaAvailable) {
            try {
                // レプリカに接続できるか確認
                DataSource replicaDataSource = (DataSource) getResolvedDataSources().get("replica");
                replicaDataSource.getConnection().close();
                return "replica";
            } catch (Exception e) {
                // レプリカに接続できない場合、マスターに切り替え
                replicaAvailable = false;
                return "master";
            }
        } else {
            return "master";
        }
    }

    // レプリカが復旧した場合に呼び出すメソッド
    public void checkReplicaAvailability() {
        try {
            DataSource replicaDataSource = (DataSource) getResolvedDataSources().get("replica");
            replicaDataSource.getConnection().close();
            replicaAvailable = true;
        } catch (Exception e) {
            replicaAvailable = false;
        }
    }
}
```

5. 定期的にレプリカの状態をチェックする  
レプリカの状態を定期的にチェックし、復旧した場合にレプリカに切り戻すためのスケジュールタスクを設定します。

ReplicaHealthCheckTask.java

```
package com.example.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ReplicaHealthCheckTask {

    private final RoutingDataSource routingDataSource;

    public ReplicaHealthCheckTask(RoutingDataSource routingDataSource) {
        this.routingDataSource = routingDataSource;
    }

    @Scheduled(fixedDelay = 60000) // 1分ごとにチェック
    public void checkReplica() {
        routingDataSource.checkReplicaAvailability();
    }
}
```

6. スケジュールタスクの有効化  
スケジュールタスクを有効にするために、@EnableSchedulingアノテーションを追加します。

Application.java

```
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

まとめ
これで、Spring BootアプリケーションでMyBatisを使用し、PostgreSQLのマスター・レプリカ構成でフェイルオーバーとフェイルバックを実現する設定が完了しました。レプリカが障害発生時にマスターに切り替え、レプリカが復旧した場合にレプリカに切り戻すことができます。