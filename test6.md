## レプリカをマスタ昇格方法

レプリカ側で以下のコマンドを実行する。

```
pg_ctl promote -D /path/to/replica/data
```

## マスタをレプリカに降格方法

1. 現在のマスターを停止します。

    ```
    pg_ctl stop -D /path/to/master/data
    ```

2. 新しいマスターから現在のマスターに対してベースバックアップを取得します。
   
   ```
   pg_basebackup -h new-master-host -D /path/to/master/data -U replicator -P -X stream
   ```

3. 現在のマスターのrecovery.confファイルを設定します。

    ```
    standby_mode = 'on'
    primary_conninfo = 'host=new-master-host port=5432 user=replicator password=rep-pass'
    trigger_file = '/tmp/pg_failover_trigger'
    ```

4. 現在のマスターをレプリカとして起動します。

    ```
    pg_ctl start -D /path/to/master/data
    ```

### recovery.confの説明

recovery.confファイルは、PostgreSQLのスタンバイ（レプリカ）サーバーの設定ファイルで、レプリケーションの動作を制御します。このファイルには、スタンバイモードの有効化、プライマリサーバーへの接続情報、フェイルオーバーのトリガーファイルなどの設定が含まれています。

以下に、recovery.confファイルの各設定項目について説明します。

recovery.confの設定項目
1. standby_mode  
standby_modeは、スタンバイモードを有効にするための設定です。この設定を'on'にすることで、サーバーがスタンバイモードで起動し、プライマリサーバーからのレプリケーションを受け入れるようになります。

    ```
    standby_mode = 'on'
    ```

2. primary_conninfo  
primary_conninfoは、プライマリサーバーへの接続情報を指定します。この設定には、ホスト名、ポート番号、ユーザー名、パスワードなどの接続情報が含まれます。

    ```
    primary_conninfo = 'host=new-master-host port=5432 user=replicator password=rep-pass'
    ```

3. trigger_file  
trigger_fileは、フェイルオーバーをトリガーするためのファイルパスを指定します。このファイルが存在すると、スタンバイサーバーはプライマリサーバーとして昇格します。通常、フェイルオーバーの際にこのファイルを作成することで、スタンバイサーバーをプライマリサーバーとして昇格させます。

    ```
    trigger_file = '/tmp/pg_failover_trigger'
    ```


recovery.confの例
以下に、recovery.confファイルの例を示します。

    ```
    standby_mode = 'on'
    primary_conninfo = 'host=new-master-host port=5432 user=replicator password=rep-pass'
    trigger_file = '/tmp/pg_failover_trigger'
    ```

まとめ
recovery.confファイルは、PostgreSQLのスタンバイサーバーの設定ファイルで、スタンバイモードの有効化、プライマリサーバーへの接続情報、フェイルオーバーのトリガーファイルなどの設定が含まれています。このファイルを適切に設定することで、スタンバイサーバーがプライマリサーバーからのレプリケーションを受け入れ、必要に応じてプライマリサーバーとして昇格することができます。