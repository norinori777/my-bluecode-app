import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormValues {
  items: { name: string; age: number }[];
}

const schema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Name is required'),
      age: yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
    })
  ),
});

const DynamicForm: React.FC = () => {
  const { control, handleSubmit, register, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      items: [{ name: '', age: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <label>
            Name:
            <input
              {...register(`items.${index}.name` as const)}
              defaultValue={field.name}
            />
            {errors.items?.[index]?.name && <p>{errors.items[index].name?.message}</p>}
          </label>
          <label>
            Age:
            <input
              type="number"
              {...register(`items.${index}.age` as const)}
              defaultValue={field.age}
            />
            {errors.items?.[index]?.age && <p>{errors.items[index].age?.message}</p>}
          </label>
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', age: 0 })}>Add Item</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;


GeoLite2データベースを利用してIPアドレスから地域情報を取得するためには、MaxMindのGeoIP2 Java APIを使用することができます。以下に、Spring BootアプリケーションでGeoLite2データベースを使用してIPアドレスから地域情報を取得する方法を示します。

1. 依存関係の追加
まず、pom.xmlにMaxMindのGeoIP2ライブラリの依存関係を追加します。

```
<dependencies>
    <!-- existing dependencies -->
    <dependency>
        <groupId>com.maxmind.geoip2</groupId>
        <artifactId>geoip2</artifactId>
        <version>3.0.1</version>
    </dependency>
</dependencies>
```

2. GeoLite2データベースのダウンロード
MaxMindのウェブサイトからGeoLite2データベースをダウンロードします。データベースファイル（GeoLite2-City.mmdbなど）をプロジェクトのリソースディレクトリ（src/main/resources）に配置します。

3. GeoIP2サービスの実装
次に、GeoIP2サービスを実装します。このサービスは、IPアドレスから地域情報を取得するためのメソッドを提供します。

GeoIP2Service.java
```
```
package com.example.demo.service;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import com.maxmind.geoip2.record.Country;
import com.maxmind.geoip2.record.City;
import com.maxmind.geoip2.record.Location;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;

@Service
public class GeoIP2Service {

    private DatabaseReader dbReader;

    @PostConstruct
    public void init() throws IOException {
        File database = new File(getClass().getClassLoader().getResource("GeoLite2-City.mmdb").getFile());
        dbReader = new DatabaseReader.Builder(database).build();
    }

    public CityResponse getCityResponse(String ip) throws IOException, GeoIp2Exception {
        InetAddress ipAddress = InetAddress.getByName(ip);
        return dbReader.city(ipAddress);
    }

    public String getCountryName(String ip) throws IOException, GeoIp2Exception {
        CityResponse response = getCityResponse(ip);
        Country country = response.getCountry();
        return country.getName();
    }

    public String getCityName(String ip) throws IOException, GeoIp2Exception {
        CityResponse response = getCityResponse(ip);
        City city = response.getCity();
        return city.getName();
    }

    public Location getLocation(String ip) throws IOException, GeoIp2Exception {
        CityResponse response = getCityResponse(ip);
        return response.getLocation();
    }
}
```

4. コントローラーの実装
次に、GeoIP2サービスを使用してIPアドレスから地域情報を取得するためのコントローラーを実装します。

GeoIPController.java
```
package com.example.demo.service;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import com.maxmind.geoip2.record.Country;
import com.maxmind.geoip2.record.City;
import com.maxmind.geoip2.record.Location;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;

@Service
public class GeoIP2Service {

    private DatabaseReader dbReader;

    @PostConstruct
    public void init() throws IOException {
        File database = new File(getClass().getClassLoader().getResource("GeoLite2-City.mmdb").getFile());
        dbReader = new DatabaseReader.Builder(database).build();
    }

    public CityResponse getCityResponse(String ip) throws IOException, GeoIp2Exception {
        InetAddress ipAddress = InetAddress.getByName(ip);
        return dbReader.city(ipAddress);
    }

    public String getCountryName(String ip) throws IOException, GeoIp2Exception {
        CityResponse response = getCityResponse(ip);
        Country country = response.getCountry();
        return country.getName();
    }

    public String getCityName(String ip) throws IOException, GeoIp2Exception {
        CityResponse response = getCityResponse(ip);
        City city = response.getCity();
        return city.getName();
    }

    public Location getLocation(String ip) throws IOException, GeoIp2Exception {
        CityResponse response = getCityResponse(ip);
        return response.getLocation();
    }
}
```
5. アプリケーションの実行
これで、Spring Bootアプリケーションを実行し、IPアドレスから地域情報を取得するエンドポイントが利用可能になります。以下のようにエンドポイントにアクセスすることで、IPアドレスに対応する国名、都市名、位置情報を取得できます。

国名を取得するエンドポイント: http://localhost:8080/geoip/country?ip=8.8.8.8
都市名を取得するエンドポイント: http://localhost:8080/geoip/city?ip=8.8.8.8
位置情報を取得するエンドポイント: http://localhost:8080/geoip/location?ip=8.8.8.8
これにより、Spring BootアプリケーションでGeoLite2データベースを使用してIPアドレスから地域情報を取得することができます。


### Deployment File
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: app
  template:
    metadata:
      labels:
        app: app
    spec:
      containers:
      - name: app
        image: openjdk:17-jdk-alpine
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_DATASOURCE_URL
          value: "jdbc:postgresql://postgres-master:5432/Chat"
        - name: SPRING_DATASOURCE_USERNAME
          value: "hoge"
        - name: SPRING_DATASOURCE_PASSWORD
          value: "hogehoge77"
        - name: SPRING_DATASOURCE_REPLICA_URL
          value: "jdbc:postgresql://postgres-replica:5432/Chat"
        - name: SPRING_DATASOURCE_REPLICA_USERNAME
          value: "hoge"
        - name: SPRING_DATASOURCE_REPLICA_PASSWORD
          value: "hogehoge77"
        volumeMounts:
        - name: app-jar
          mountPath: /app.jar
          subPath: demo-0.0.1-SNAPSHOT.jar
        command: ["java", "-jar", "/app.jar"]
      volumes:
      - name: app-jar
        hostPath:
          path: /C:/work/test3/target/demo-0.0.1-SNAPSHOT.jar
          type: File
```

### Service File
```
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: app
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
  type: LoadBalancer
```

注意点
hostPathを使用してホストのファイルをコンテナーにマウントしていますが、これは開発環境での使用に限られます。本番環境では、ConfigMapやPersistentVolumeを使用することを検討してください。
depends_onはKubernetesには直接対応する機能がないため、必要に応じてPodの起動順序を管理するための他の方法（例：Init Containers）を検討してください。
これらのファイルを適用することで、Kubernetesクラスターにデプロイできます。

```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```




KubernetesのServiceにはいくつかのタイプがあり、それぞれ異なる方法でネットワークトラフィックを管理します。主なServiceタイプには、ClusterIP、NodePort、LoadBalancer、およびExternalNameがあります。ここでは、NodePortとLoadBalancerの違いについて説明します。

NodePort
概要:
NodePortは、各ノードの特定のポート（30000-32767の範囲）を開放し、そのポートを通じてServiceにアクセスできるようにします。
使用方法:
クラスター外部からノードのIPアドレスと指定されたポートを使用してアクセスします。
利点:
簡単に設定でき、外部からのアクセスが可能です。
欠点:
ノードのIPアドレスを知っている必要があり、負荷分散機能が限られています。
LoadBalancer
概要:
LoadBalancerは、クラウドプロバイダー（AWS、GCP、Azureなど）のロードバランサーをプロビジョニングし、外部IPアドレスを取得してトラフィックを分散します。
使用方法:
クラウドプロバイダーが提供する外部IPアドレスを使用してアクセスします。
利点:
クラウドプロバイダーのロードバランサーを利用するため、スケーラビリティと高可用性が向上します。
欠点:
クラウドプロバイダーに依存しており、追加のコストが発生する場合があります。
例: NodePortとLoadBalancerのService定義
NodePortの例
```
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  type: NodePort
  selector:
    app: app
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
      nodePort: 30036  # このポートは30000-32767の範囲で指定
```
LoadBalancerの例
```
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  type: LoadBalancer
  selector:
    app: app
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
```
まとめ
NodePort:

各ノードの特定のポートを開放し、外部からアクセス可能にします。
簡単に設定できるが、負荷分散機能が限られています。
LoadBalancer:

クラウドプロバイダーのロードバランサーを利用し、外部IPアドレスを取得してトラフィックを分散します。
スケーラビリティと高可用性が向上しますが、クラウドプロバイダーに依存し、追加のコストが発生する場合があります。
これらの違いを理解し、アプリケーションの要件に応じて適切なServiceタイプを選択してください。






VSCodeで開発したSpring Bootアプリケーションを本番環境のDocker上に構築したTomcatにデプロイするための手順を説明します。また、PostgreSQLがMaster-Replica構成となっており、Tomcatとは別のコンテナとして構成されている場合の設定も含めて説明します。


手順概要

1. Spring BootアプリケーションをWARファイルとしてパッケージ化
2. Docker上にTomcatを構築
3. Docker上にPostgreSQLのMaster-Replica構成を構築
4. Docker Composeを使用して全てのコンテナを起動
5. Spring Bootアプリケーションの設定

1. Spring BootアプリケーションをWARファイルとしてパッケージ化


1.1 pom.xmlの設定

Spring BootアプリケーションをWARファイルとしてパッケージ化するために、pom.xmlファイルを設定します。

<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-spring-boot-app</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>war</packaging>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.4</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <!-- その他の依存関係 -->
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>

1.2 SpringBootServletInitializerの設定

Spring BootアプリケーションをWARファイルとしてパッケージ化するために、SpringBootServletInitializerを拡張します。

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
public class ServletInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MySpringBootApplication.class);
    }
}

1.3 アプリケーションのエントリーポイント

アプリケーションのエントリーポイントを定義します。

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class MySpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(MySpringBootApplication.class, args);
    }
}

1.4 WARファイルのビルド

Mavenを使用してWARファイルをビルドします。

mvn clean package


2. Docker上にTomcatを構築


2.1 Dockerfileの作成

Tomcatを含むDockerイメージを作成するためのDockerfileを作成します。

FROM tomcat:9.0
# WARファイルをTomcatのwebappsディレクトリにコピー
COPY target/my-spring-boot-app.war /usr/local/tomcat/webapps/

2.2 Dockerイメージのビルド

Dockerイメージをビルドします。

docker build -t my-tomcat-app .


3. Docker上にPostgreSQLのMaster-Replica構成を構築


3.1 Docker Composeの設定

Docker Composeを使用して、PostgreSQLのMaster-Replica構成を設定します。


docker-compose.yml

version: '3'
services:
  postgres-master:
    image: postgres:13
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
    volumes:
      - ./master-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
  postgres-replica:
    image: postgres:13
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_MASTER_HOST: postgres-master
    volumes:
      - ./replica-data:/var/lib/postgresql/data
    ports:
      - "5433:5432"
    depends_on:
      - postgres-master
  myapp:
    image: my-tomcat-app
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_MASTER_URL=jdbc:postgresql://postgres-master:5432/mydb
      - SPRING_DATASOURCE_MASTER_USERNAME=myuser
      - SPRING_DATASOURCE_MASTER_PASSWORD=mypassword
      - SPRING_DATASOURCE_REPLICA_URL=jdbc:postgresql://postgres-replica:5432/mydb
      - SPRING_DATASOURCE_REPLICA_USERNAME=myuser
      - SPRING_DATASOURCE_REPLICA_PASSWORD=mypassword
    ports:
      - "8080:8080"
    depends_on:
      - postgres-master
      - postgres-replica

4. Docker Composeを使用して全てのコンテナを起動

Docker Composeを使用して、全てのコンテナを起動します。

docker-compose up -d


5. Spring Bootアプリケーションの設定


5.1 application.ymlの設定

プロファイルを使用して、MasterとReplicaの接続情報を設定します。


application.yml

spring:
  datasource:
    master:
      url: ${SPRING_DATASOURCE_MASTER_URL}
      username: ${SPRING_DATASOURCE_MASTER_USERNAME}
      password: ${SPRING_DATASOURCE_MASTER_PASSWORD}
      driver-class-name: org.postgresql.Driver
    replica:
      url: ${SPRING_DATASOURCE_REPLICA_URL}
      username: ${SPRING_DATASOURCE_REPLICA_USERNAME}
      password: ${SPRING_DATASOURCE_REPLICA_PASSWORD}
      driver-class-name: org.postgresql.Driver

5.2 カスタムDataSourceの設定

MasterとReplicaのDataSourceを設定し、読み取りと書き込みを適切に振り分けるためのカスタムDataSourceを作成します。


DataSourceConfig.java

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
@Configuration
public class DataSourceConfig {
    @Bean(name = "masterDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.master")
    public DataSource masterDataSource() {
        return DataSourceBuilder.create().build();
    }
    @Bean(name = "replicaDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.replica")
    public DataSource replicaDataSource() {
        return DataSourceBuilder.create().build();
    }
    @Bean
    public DataSource routingDataSource(@Qualifier("masterDataSource") DataSource masterDataSource,
                                        @Qualifier("replicaDataSource") DataSource replicaDataSource) {
        AbstractRoutingDataSource routingDataSource = new AbstractRoutingDataSource() {
            @Override
            protected Object determineCurrentLookupKey() {
                return DataSourceContextHolder.getDataSourceType();
            }
        };
        Map<Object, Object> targetDataSources = new HashMap<>();
        targetDataSources.put("master", masterDataSource);
        targetDataSources.put("replica", replicaDataSource);
        routingDataSource.setTargetDataSources(targetDataSources);
        routingDataSource.setDefaultTargetDataSource(masterDataSource);
        return routingDataSource;
    }
}

DataSourceContextHolder.java

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

DataSourceAspect.java

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
@Aspect
@Component
public class DataSourceAspect {
    @Before("@annotation(transactional) && execution(* com.example..*Service.*(..))")
    public void setDataSourceKey(Transactional transactional) {
        if (transactional.readOnly()) {
            DataSourceContextHolder.setDataSourceType("replica");
        } else {
            DataSourceContextHolder.setDataSourceType("master");
        }
    }
}

まとめ

VSCodeで開発したSpring Bootアプリケーションを本番環境のDocker上に構築したTomcatにデプロイするためには、以下の手順を実行します。

1. Spring BootアプリケーションをWARファイルとしてパッケージ化する。
2. Docker上にTomcatを構築する。
3. Docker上にPostgreSQLのMaster-Replica構成を構築する。
4. Docker Composeを使用して全てのコンテナを起動する。
5. Spring Bootアプリケーションの設定を行う。
これにより、Spring Bootアプリケーションが本番環境で正しく動作し、Master-Replica構成のPostgreSQLに対して適切に読み取りと書き込みを行うことができます。




# 日次パーティション

日次のパーティションとする。サブパーティションとして、ファイアーウォールのパーティションを作成する。

①ログテーブルを作成する。（初期のみ）
```
CREATE TABLE system_logs (
    id SERIAL PRIMARY KEY,
    system_name VARCHAR(50),
    log_date DATE,
    log_message TEXT
) PARTITION BY RANGE (log_date);
```

②当日の日次のパーティションがない場合、作成する。
```
CREATE TABLE system_logs_2025_01_01 PARTITION OF system_logs
    FOR VALUES FROM ('2025-01-01') TO ('2025-01-02')
    PARTITION BY LIST (system_name);
```

③ログを登録するFW(FW6666_01)のサブパーティションがない場合、作成する。
```
CREATE TABLE system_logs_2025_01_01_FW6666_01 PARTITION OF system_logs_2025_01_01
    FOR VALUES IN ('FW6666_01');
```




インデクスの検討

---
Postgresql１１以降は、親テーブルにインデックスを付与するとパーティションにも自動的に適用される。
そのため、今回は、問題ないと考えられる。

インデックスの監視
pg_stat_user_indexesビューを使用して、インデックスの使用状況を監視します。断片化が進んでいるインデックスを特定し、再構築の必要性を判断します
```
SELECT
    schemaname,
    relname,
    indexrelname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM
    pg_stat_user_indexes
WHERE
    schemaname = 'public';
```


インデックスの再構築

自動メンテナンスツールの利用

REINDEXコマンド: REINDEXコマンドを使用してインデックスを再構築します。特定のインデックス、テーブル全体、またはデータベース全体を再構築できます
```
-- 特定のインデックスを再構築
REINDEX INDEX idx_logs_date;
-- 特定のテーブルのすべてのインデックスを再構築
REINDEX TABLE logs;
-- データベース全体のすべてのインデックスを再構築
REINDEX DATABASE mydatabase;
```

pg_repackやreindexdbなどのツールを使用して、自動的にインデックスを再構築することができます。これらのツールを定期的に実行することで、インデックスの断片化を防ぎます

pg_repackツール: pg_repackは、テーブルやインデックスをロックせずに再構築できるツールです。これにより、ダウンタイムを最小限に抑えることができます
```
g_repack -t logs -d mydatabase
```



パーティションでのデータ削除

以下に、シェルスクリプトを使用して、PostgreSQLデータベース内の日次パーティションを日付でLIKE検索し、180日経過したパーティションを特定して削除する方法を示します。このスクリプトは、psqlコマンドを使用してPostgreSQLに接続し、対象のパーティションを削除します。
```
#!/bin/bash
# PostgreSQLの接続情報
DB_NAME="your_database_name"
DB_USER="your_username"
DB_HOST="your_host"
DB_PORT="your_port"
# 現在の日付から180日前の日付を計算
TARGET_DATE=$(date -d "180 days ago" +"%Y-%m-%d")
# パーティション名のプレフィックス（例：sales_）
PARTITION_PREFIX="sales_"
# 対象のパーティションを特定して削除
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "
DO \$\$
DECLARE
    partition RECORD;
BEGIN
    FOR partition IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public' AND tablename LIKE '${PARTITION_PREFIX}%'
    LOOP
        -- パーティション名から日付部分を抽出
        IF substring(partition.tablename, length('${PARTITION_PREFIX}') + 1) < '${TARGET_DATE}' THEN
            EXECUTE 'DROP TABLE ' || partition.tablename;
            RAISE NOTICE 'Dropped partition: %', partition.tablename;
        END IF;
    END LOOP;
END \$\$;
" 
```

スクリプトの説明

1. PostgreSQLの接続情報:
	- DB_NAME, DB_USER, DB_HOST, DB_PORTを適切な値に設定します。
2. 180日前の日付を計算:
	- date -d "180 days ago" +"%Y-%m-%d"コマンドを使用して、180日前の日付を計算します。
3. パーティション名のプレフィックス:
	- PARTITION_PREFIXにパーティション名のプレフィックスを設定します（例：sales_）。
4. 対象のパーティションを特定して削除:
	- psqlコマンドを使用してPostgreSQLに接続し、pg_tablesビューからパーティション名をLIKE検索します。
	- パーティション名から日付部分を抽出し、180日前の日付と比較して古いパーティションを削除します。

実行方法

1. スクリプトをファイルに保存します（例：drop_old_partitions.sh）。
2. スクリプトに実行権限を付与します。

chmod +x drop_old_partitions.sh

3. スクリプトを実行します。

./drop_old_partitions.sh

このスクリプトを定期的に実行することで、180日経過した古いパーティションを自動的に削除できます。



この部分のコードは、PostgreSQLのPL/pgSQLブロック内で、特定の条件に基づいてパーティションを削除するためのロジックを実装しています。以下に各行の詳細な説明を示します。


コードの詳細

IF substring(partition.tablename, length('${PARTITION_PREFIX}') + 1) < '${TARGET_DATE}' THEN
    EXECUTE 'DROP TABLE ' || partition.tablename;
    RAISE NOTICE 'Dropped partition: %', partition.tablename;
END IF;

各行の説明

1. IF文:
   
   
```
1. IF substring(partition.tablename, length('${PARTITION_PREFIX}') + 1) < '${TARGET_DATE}' THEN
```

	- substring(partition.tablename, length('${PARTITION_PREFIX}') + 1):
		- partition.tablenameからパーティション名のプレフィックス（例：sales_）を除いた部分を抽出します。
		- length('${PARTITION_PREFIX}') + 1は、プレフィックスの長さに1を加えた位置から文字列を抽出することを意味します。例えば、sales_2023_01というパーティション名の場合、2023_01が抽出されます。
	- < '${TARGET_DATE}':
		- 抽出した文字列（パーティション名の日付部分）が、180日前の日付（${TARGET_DATE}）よりも前の日付であるかどうかを比較します。
	- この条件が真（True）である場合、次のブロックが実行されます。
1. EXECUTE文:
   
   
```
1. EXECUTE 'DROP TABLE ' || partition.tablename;
```

	- EXECUTE 'DROP TABLE ' || partition.tablename;:
		- 動的SQLを使用して、特定のパーティションテーブルを削除します。
		- partition.tablenameには、削除対象のパーティション名が含まれています。
		- 例えば、partition.tablenameがsales_2023_01の場合、実行されるSQLはDROP TABLE sales_2023_01;となります。
1. RAISE NOTICE文:
   
   
```
1. RAISE NOTICE 'Dropped partition: %', partition.tablename;
```

	- RAISE NOTICE 'Dropped partition: %', partition.tablename;:
		- パーティションが削除されたことを通知するメッセージをログに出力します。
		- %はプレースホルダーで、partition.tablenameの値がここに挿入されます。
		- 例えば、partition.tablenameがsales_2023_01の場合、出力されるメッセージはNOTICE: Dropped partition: sales_2023_01となります。
1. END IF:
   
   
```
1. END IF;
```

	- IFブロックの終了を示します。

まとめ

このコードブロックは、以下の手順で動作します：

1. パーティション名から日付部分を抽出します。
2. 抽出した日付部分が180日前の日付よりも前であるかどうかを確認します。
3. 条件が真である場合、そのパーティションを削除し、削除されたことを通知するメッセージをログに出力します。
これにより、古いパーティションを自動的に特定して削除することができます。



以下に、指定された条件に基づいて、180日より前のパーティションを削除するシェルスクリプトを示します。このスクリプトは、logs_YYYY_MM_DD形式のパーティションと、そのサブパーティションであるlogs_YYYY_MM_DD_SystemName_連番を削除します。


シェルスクリプトの例

```
#!/bin/bash
# PostgreSQLの接続情報
DB_NAME="your_database_name"
DB_USER="your_username"
DB_HOST="your_host"
DB_PORT="your_port"
# 現在の日付から180日前の日付を計算
TARGET_DATE=$(date -d "180 days ago" +"%Y_%m_%d")
# パーティション名のプレフィックス（例：logs_）
PARTITION_PREFIX="logs_"
# 対象のパーティションを特定して削除
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "
DO \$\$
DECLARE
    partition RECORD;
BEGIN
    FOR partition IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public' AND tablename LIKE '${PARTITION_PREFIX}%'
    LOOP
        -- パーティション名から日付部分を抽出
        IF substring(partition.tablename, length('${PARTITION_PREFIX}') + 1, 10) < '${TARGET_DATE}' THEN
            EXECUTE 'DROP TABLE ' || partition.tablename;
            RAISE NOTICE 'Dropped partition: %', partition.tablename;
        END IF;
    END LOOP;
END \$\$;
" 
```

スクリプトの説明

1. PostgreSQLの接続情報:
	- DB_NAME, DB_USER, DB_HOST, DB_PORTを適切な値に設定します。
2. 180日前の日付を計算:
	- date -d "180 days ago" +"%Y_%m_%d"コマンドを使用して、180日前の日付を計算します。
3. パーティション名のプレフィックス:
	- PARTITION_PREFIXにパーティション名のプレフィックスを設定します（例：logs_）。
4. 対象のパーティションを特定して削除:
	- psqlコマンドを使用してPostgreSQLに接続し、pg_tablesビューからパーティション名をLIKE検索します。
	- パーティション名から日付部分を抽出し、180日前の日付と比較して古いパーティションを削除します。

実行方法

1. スクリプトをファイルに保存します（例：drop_old_partitions.sh）。
2. スクリプトに実行権限を付与します。

chmod +x drop_old_partitions.sh

3. スクリプトを実行します。

./drop_old_partitions.sh

このスクリプトを定期的に実行することで、180日経過した古いパーティションを自動的に削除できます。







# 大規模Postgresqlの対応事項

大規模データの登録、変更、削除を効率的に行う

---

以下の設計および実装のポイントを考慮する必要があります。


1. インデックスの最適化:
- 適切なインデックスを作成し、クエリのパフォーマンスを向上させます。
- インデックスの種類（B-tree、Hash、GIN、GiSTなど）をデータとクエリに応じて選択します。
2. パーティショニング:
- テーブルをパーティションに分割し、特定の条件に基づいてデータを分割します。これにより、クエリのパフォーマンスが向上します。
3. バルクインサート:
- 大量のデータを一度に挿入する場合、COPYコマンドやバルクインサートを使用します。これにより、挿入のオーバーヘッドを減らします。
4. トランザクション管理:
- 大規模な変更や削除を行う場合、トランザクションを適切に管理し、データの一貫性を保ちます。
- トランザクションのサイズを適切に設定し、ロックの競合を避けます。
5. VACUUMとANALYZE:
- 定期的にVACUUMとANALYZEを実行し、データベースの統計情報を最新の状態に保ち、パフォーマンスを最適化します。
6. バッチ処理:
- 大規模なデータ変更や削除をバッチ処理で行い、一度に処理するデータ量を制限します。これにより、システムの負荷を分散します。
7. 並列処理:
- PostgreSQLの並列クエリ機能を活用し、複数のCPUコアを使用してクエリを高速化します。
8. 適切なハードウェアリソース:
- 十分なメモリ、CPU、およびストレージを確保し、I/O性能を向上させます。
9. 監視とチューニング:
- データベースのパフォーマンスを監視し、必要に応じて設定を調整します。pg_stat_statementsなどの拡張機能を使用してクエリのパフォーマンスを分析します。



PostgreSQLで並列処理

---
PostgreSQLで並列処理を実装するためには、以下のような手順を踏むことが一般的です。

1. PostgreSQLの設定:
- postgresql.confファイルで並列処理に関連するパラメータを設定します。
### postgresql.conf

```
max_parallel_workers_per_gather = 4  # 並列クエリで使用するワーカーの最大数
max_parallel_workers = 8             # 全体で使用するワーカーの最大数
```
2. 並列クエリの実行:
	- PostgreSQLは自動的に並列クエリを実行します。例えば、以下のようなクエリが並列で実行される可能性があります。
```
SELECT COUNT(*)
FROM large_table
WHERE some_column = 'some_value';
```
3. 並列処理の確認:
	- 実行計画を確認して、クエリが並列で実行されているかどうかを確認します。
```
EXPLAIN ANALYZE
SELECT COUNT(*)
FROM large_table
WHERE some_column = 'some_value';
```
実行計画にParallel Seq ScanやGatherが含まれている場合、クエリが並列で実行されています。

4. 並列処理の制御:
	- クエリごとに並列処理を制御することも可能です。例えば、特定のクエリで並列処理を無効にする場合は、以下のように設定します。
```
SET max_parallel_workers_per_gather = 0;
SELECT COUNT(*)
FROM large_table
WHERE some_column = 'some_value';
```
5. 並列処理のチューニング:
	- 並列処理のパフォーマンスを最適化するために、以下のパラメータも調整します。
# postgresql.conf
```
parallel_setup_cost = 1000           # 並列クエリのセットアップコスト
parallel_tuple_cost = 0.1            # 並列クエリのタプルコスト
```
これらの設定を調整することで、PostgreSQLの並列処理を効果的に利用し、大規模データの処理を高速化することができます。



パーティションの作成間隔の設計

---
PostgreSQLで最適なパーティションの作成間隔を設計する際には、以下のポイントを考慮する必要があります。

1. データの特性:
	- データの増加速度やアクセスパターンを理解します。例えば、日次、月次、年次などの時間ベースのデータや、特定の範囲に基づくデータなど。
2. パーティションのサイズ:
	- 各パーティションのサイズが適切であることを確認します。一般的には、各パーティションが数百万行を超えないように設計します。具体的なレコード数の目安としては、1パーティションあたり数十万から数百万行が推奨されます。
3. クエリのパフォーマンス:
	- パーティションを使用することで、クエリのパフォーマンスが向上することを確認します。パーティションプルーニング（不要なパーティションをスキャンしない）が効果的に機能するように設計します。
4. メンテナンスの容易さ:
	- パーティションの追加や削除が容易であることを確認します。例えば、古いデータを定期的に削除する場合、パーティション単位で削除することで効率的に行えます。

パーティションの設計例

以下に、時間ベースのデータを月次でパーティション分割する例を示します。

1. 親テーブルの作成:
```
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    sale_date DATE NOT NULL,
    amount NUMERIC
) PARTITION BY RANGE (sale_date);
```
2. パーティションの作成:
```
CREATE TABLE sales_2023_01 PARTITION OF sales
    FOR VALUES FROM ('2023-01-01') TO ('2023-02-01');
CREATE TABLE sales_2023_02 PARTITION OF sales
    FOR VALUES FROM ('2023-02-01') TO ('2023-03-01');
```
-- 必要に応じて追加のパーティションを作成
3. パーティションの追加:
	- 新しい月が始まる前に、新しいパーティションを追加します。
```
CREATE TABLE sales_2023_03 PARTITION OF sales
    FOR VALUES FROM ('2023-03-01') TO ('2023-04-01');
```
4. 古いパーティションの削除:
	- 古いデータを削除する場合、パーティション単位で削除します。
```
DROP TABLE sales_2022_12;
```

パーティションのサイズと間隔の調整

- データの増加速度に応じて、パーティションの間隔を調整します。例えば、データが急速に増加する場合は、月次ではなく週次や日次でパーティションを作成することを検討します。
- クエリのパフォーマンスを監視し、必要に応じてパーティションの間隔やサイズを調整します。
これらのポイントを考慮してパーティションを設計することで、PostgreSQLのパフォーマンスを最適化し、効率的なデータ管理を実現できます。


パーティションありのデータの削除

---
効率的には、パーティション単位で削除するのがよい。
パーティションがあるテーブルのデータを削除する場合、以下の方法があります。


1. パーティション単位で削除

特定のパーティション全体を削除する場合、DROP TABLEコマンドを使用します。これにより、パーティション内のすべてのデータが削除されます。

-- パーティション sales_2023_01 を削除
```
DROP TABLE sales_2023_01;
```

2. パーティション内のデータを削除

特定のパーティション内の一部のデータを削除する場合、通常のDELETE文を使用します。

-- パーティション sales_2023_02 内の特定のデータを削除
```
DELETE FROM sales_2023_02
WHERE sale_date = '2023-02-15';
```

3. 親テーブルからデータを削除

親テーブルから特定の条件に基づいてデータを削除する場合、PostgreSQLは自動的に適切なパーティションからデータを削除します。

-- 親テーブルから特定の条件に基づいてデータを削除
```
DELETE FROM sales
WHERE sale_date < '2023-01-01';
```
この場合、sale_dateが2023-01-01より前のデータが含まれるパーティションから該当するデータが削除されます。


4. パーティションのメンテナンス

古いデータを定期的に削除する場合、パーティション単位で削除するのが効率的です。例えば、月次でパーティションを作成している場合、古い月のパーティションを削除することで、古いデータを一括で削除できます。






## モーダルスクロール

Reactでモーダルを開いた際に親側のスクロールを移動させないようにするには、モーダルが開かれたときに親要素のスクロールを無効にし、モーダルが閉じられたときにスクロールを再度有効にする必要があります。以下のように実装できます。

モーダルが開かれたときにbodyのスクロールを無効にする。
モーダルが閉じられたときにbodyのスクロールを有効にする。
以下はその実装例です。

```
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <p>モーダルの内容</p>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```

この例では、isOpenがtrueの場合にモーダルが表示され、bodyのスクロールが無効になります。モーダルが閉じられると、bodyのスクロールが再度有効になります。

モーダルを使用するコンポーネントは以下のようになります。

```
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <p>モーダルの内容</p>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```


## ローディング位置修正


表示部分のみの中央位置にローディングを表示するには、ローディングコンポーネントを親要素の中央に配置するスタイルを適用する必要があります。以下はその実装例です。

まず、ローディングコンポーネントを作成します。

```
import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
```

次に、Loading.cssファイルでスタイルを定義します。

```
.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

このスタイルでは、loading-containerが親要素の中央に配置されるように設定されています。position: absolute;とtransform: translate(-50%, -50%);を使用して、親要素の中央にローディングスピナーを配置します。

次に、ローディングコンポーネントを使用するコンポーネントを作成します。

```
import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1>コンテンツがここに表示されます</h1>
        </div>
      )}
    </div>
  );
};

export default App;
```

この例では、Appコンポーネントがローディング状態を管理し、ローディング中はLoadingコンポーネントを表示します。Loadingコンポーネントは親要素の中央に表示されます。Appコンポーネントのスタイルにposition: relative;を設定することで、Loadingコンポーネントが親要素の中央に配置されるようになります。

## React-Routerのスクロール位置維持

React Routerを使用して、一覧ページから詳細ページに遷移後、詳細ページから一覧に戻った際に一覧ページのスクロール位置を維持するには、スクロール位置を保存しておき、戻った際にその位置にスクロールする必要があります。以下の手順で実装できます。

一覧ページのスクロール位置を保存する。
詳細ページから戻った際に保存したスクロール位置にスクロールする。
以下はその実装例です。

スクロール位置を保存するためのカスタムフック
まず、スクロール位置を保存するためのカスタムフックを作成します。

```
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollPosition) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location]);
};

export default useScrollRestoration;
```


一覧ページコンポーネント
次に、一覧ページコンポーネントでスクロール位置を保存し、詳細ページに遷移する際にその位置を状態として渡します。

```
import React from 'react';
import { Link } from 'react-router-dom';
import useScrollRestoration from './useScrollRestoration';

const ListPage = () => {
  useScrollRestoration();

  const handleLinkClick = (e, id) => {
    const scrollPosition = window.scrollY;
    e.preventDefault();
    window.history.pushState({ scrollPosition }, '', `/details/${id}`);
  };  

  return (
    <div>
      <h1>一覧ページ</h1>
      <ul>
        <li>
          <Link to="/details/1" onClick={(e) => handleLinkClick(e, 1)}>詳細ページ 1</Link>
        </li>
        <li>
          <Link to="/details/2" onClick={(e) => handleLinkClick(e, 2)}>詳細ページ 2</Link>
        </li>
        {/* 他のリストアイテム */}
      </ul>
    </div>
  );
};

export default ListPage;
```

詳細ページコンポーネント
詳細ページコンポーネントは特に変更は必要ありませんが、戻るリンクを追加しておくと便利です。

```
import React from 'react';
import { Link } from 'react-router-dom';

const DetailPage = ({ match }) => {
  return (
    <div>
      <h1>詳細ページ {match.params.id}</h1>
      <Link to="/">一覧に戻る</Link>
    </div>
  );
};

export default DetailPage;
```

ルーティング設定
最後に、React Routerのルーティング設定を行います。

```
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPage from './ListPage';
import DetailPage from './DetailPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ListPage} />
        <Route path="/details/:id" component={DetailPage} />
      </Switch>
    </Router>
  );
};

export default App;
```

この実装により、一覧ページから詳細ページに遷移した際にスクロール位置が保存され、詳細ページから戻った際に一覧ページのスクロール位置が維持されます。