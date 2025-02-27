# リロード対応

詳細画面でリロードをした場合に、React Routerで設定したURLに対してバックエンドにGETリクエストが送信され、404エラーが発生する問題を解決するためには、Spring Bootの設定を調整して、すべての非APIリクエストをReactアプリケーションのエントリーポイント（通常はindex.html）にリダイレクトする必要があります。

以下に、具体的な手順を示します。

1. Spring Bootの設定
Spring Bootで、すべての非APIリクエストをindex.htmlにリダイレクトするための設定を行います。

1.1. WebMvcConfigurerを使用する方法
WebMvcConfigurerを実装して、すべての非APIリクエストをindex.htmlにリダイレクトします。

```
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // すべての非APIリクエストをindex.htmlにリダイレクト
        registry.addViewController("/{spring:[a-zA-Z0-9-_]+}")
                .setViewName("forward:/index.html");
        registry.addViewController("/**/{spring:[a-zA-Z0-9-_]+}")
                .setViewName("forward:/index.html");
        registry.addViewController("/{spring:[a-zA-Z0-9-_]+}/**{spring:?!(\\.js|\\.css|\\.png|\\.jpg|\\.jpeg|\\.gif|\\.svg)$}")
                .setViewName("forward:/index.html");
    }
}
```

2. React Routerの設定
React Routerの設定は以下のようにします。

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

3. Spring Bootの静的ファイルの配置
Reactアプリケーションをビルドし、生成された静的ファイルをSpring Bootのresources/staticディレクトリに配置します。

```
# Reactアプリケーションのビルド
npm run build

# ビルドされたファイルをSpring Bootのstaticディレクトリにコピー
cp -r build/* src/main/resources/static/
```

4. Spring BootのAPIエンドポイントの設定
Spring BootでAPIエンドポイントを設定します。これにより、APIリクエストは適切に処理され、その他のリクエストはindex.htmlにリダイレクトされます。

```
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class ApiController {

    @GetMapping("/api/data")
    public List<Item> getData() {
        return Arrays.asList(
                new Item(1, "Item 1"),
                new Item(2, "Item 2")
        );
    }

    @GetMapping("/api/data/{id}")
    public Item getDataById(@PathVariable int id) {
        return new Item(id, "Item " + id);
    }

    static class Item {
        private int id;
        private String name;

        public Item(int id, String name) {
            this.id = id;
            this.name = name;
        }

        public int getId() {
            return id;
        }

        public String getName() {
            return name;
        }
    }
}
```

まとめ
これらの設定により、Spring Bootがすべての非APIリクエストをindex.htmlにリダイレクトし、React RouterがクライアントサイドでURLを処理できるようになります。これにより、リロード時に404 Not Foundエラーを防ぎつつ、REST APIも正常に動作するようになります。