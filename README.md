# リファレンス
## 導入
### React TypeScript
```
npx create-react-app ./ --template typescript
```

### Test
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @testing-library/dom
- jest-environment-jsdom
- axios-mock-adapter
  
```
# jest.config.js
module.exports = {
    testEnvironment: "jest-environment-jsdom",
}
```

## jestのEM６対応
```
yarn add @babel/preset-react @babel/preset-typescript babel-jest -D
```
```
#.babelrc
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```
```
#jest.config.js
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
```
### Yarnへの切り替え
1. package.jsonのlockファイルを削除
2. 以下を実施。
   ```
   yarn install
   ```
### webpack
```
# Webpack導入
yarn add --dev webpack webpack-cli html-webpack-plugin webpack-merge
```
```
# CSS関連ローダー導入
yarn add --dev  mini-css-extract-plugin css-minimizer-webpack-plugin css-loader postcss postcss-loader autoprefixer
```
```
yarn add --dev ts-loader
```
```
# webpack.config
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpckPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx', '.css', '.json'],
    },
    plugins: [
        //　htmlにバンドルしたjavascriptとCSSをセットする
        new HtmlWebpckPlugin({
            template: './public/index.html',
            filename: '../index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '../css/style.css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            }
        ]
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
    }
};
```
```
# tsconfig
{
  "compilerOptions": {
    "target": "es5",
    "baseUrl": "./",
    "paths": {
      "*": ["node_modules/*"]
    },
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}

```

## Redux
```
yarn add redux react-redux typescript-fsa typescript-fsa-reducers 
```
```
yarn add @reduxjs/toolkit
```

## react-router-dom
```
yarn add react-router-dom
```

## tailWindcss
```
yarn add tailwindcss -D
```
```
yarn add semver
```
```
npx tailwindcss init
```
```
// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
```
// tailwindcss.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  },
  plugins: [],
}
```

## redux-toolkit
- slices.tsを作成すると、actionも自動的に作成してくれ、Reduxでよく言われるボイラープレートの改善がされている。
- storeの更新時にスプレッド構文を利用してStoreを更新していたが、その対応も不要となった。
- 非同期処理とStoreの連携が容易にできる。

参考：https://reffect.co.jp/react/redux-toolkit#:~:text=Redux%20Tool

## reactのルーティング
### ルーティングコンテンツ
- 図にあるメニュー部のコンテンツをcontents.tsに配列景色で設定する。コンテンツを追加する場合、以下の定義に追加する。
- ルーティング対象のコンテンツを読み込むコンポーネントにて以下の設定が読み込まれて、ルーティングコンテンツとして取り込まれる。
  ```
  # ルーディング対象のコンテンツ情報
  export const contentItems: ContentItem[] = [
    { link: '/', key: 'top', componentId: 'Top' },
    { link: '/counter', key: 'counter', componentId: 'Counter' },
    { link: '/member', key: 'member', componentId: 'MemberList' },
    { link: '/todo', key: 'todo', componentId: 'Todo' },
    { link: '/todo/:id', key: 'todoForm', componentId: 'TodoForm' },
    { link: '/test', key: 'test', componentId: 'Test' },
  ]

  # メニュー表示情報
  export const headerMenuItems: HeaderMenuItem[] = [
      { text: 'Top', initialLink: '/' },
      { text: 'Counter', initialLink: '/counter' },
      { text: 'Member', initialLink: '/member' },
      { text: 'Todo', initialLink: '/todo' },
      { text: 'Test', initialLink: '/test' },
    ]

    # コンテンツのコンポーネント情報
    export const componentMap: ComponentMap = {
      'Top': TopContainer,
      'Counter': Counter,
      'MemberList': MemberList,
      'Todo': Todo,
      'TodoForm': TodoFormContainer,
      'Test': TestContainer,
  };
  ```
  ![alt text](image.png)

### ルーティング時の状態管理
画面表示時に、どこから遷移があったかで状態の初期状態をコントロールする。
例えば、検索条件があるユーザー一覧画面からユーザー詳細画面に遷移して、再度、ユーザー一覧画面に戻った場合は、検索条件は維持されるよにしたい場合、
ユーザー一覧画面への遷移元がユーザー詳細画面の場合は、検索条件は、維持されるようにする。

遷移元と遷移先の情報を維持するために、react-routeのstateで状態を受け渡す方法をとる。
以下の方法で、stateで値を受け渡すようにする。

#### navigateの場合
```
export const MemberList = (props: MemberListProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = () => {
        navigate('/member/add',{state: {nextLocationPath: '/member/add', previousLocationPath: location.pathname}}) // ここでセット　location.pathnameは、現状のpathとなる
    }
```

#### Linkの場合
```
export const MenuLinkItem = (props: MenuLinkItemProps) => {
  const location = useLocation()
  return (
    <>
      <Link data-testid="linkItem" className="font-medium" to={props.link}
        state={{previousLocationPath: location.pathname, nextLocationPath: props.link}}>
        {props.text}
      </Link>
    </>
  )
}
```

#### stateの参照
locationのstateから遷移元のpathを取得して、状態のリセットをコントロール
```
    const [isReady, setRady] = useState(false)
    
    if(!isReady) {
        const previousLocationPath = location.state?.previousLocationPath
        partialResetPath.includes(previousLocationPath) ? dispatch(partialReset()) : dispatch(reset())
        setRady(true)
    }
```


## React Hook Form

- 導入
  ```
  yarn add react-hook-form @hookform/resolvers yup
  ```
- 非制御系で利用することが推奨されているため、この方針に従いネイティブのHTMLフォーム要素を直接操作することでパフォーマンスが向上する。
- Presentationコンポーネント: UIのレンダリングに専念し、propsを使用して状態を管理する。
- Containerコンポーネント: React Hook Formを使用してフォームの状態を管理し、Presentationコンポーネントに必要なデータや関数を渡す。
- 検証
  - yupを利用して、バリデーションの定義を外出しにする。
    ```
    import * as yup from 'yup'

    export const schema = yup.object({
      todo: yup
        .string()
        .required('Todoの入力は必須です。')
        .min(3, 'Todoは、３文字以上入力してください。')
        .max(100, 'Todoは、最大１００文字となります。')
    })
  - Formにバリデーションの定義を渡す。
    ```
    export const TodoForm = (props: TodoFormProps) => {
    const { register, handleSubmit, formState: {errors} } = useForm(
        {
            defaultValues: { todo: props.todo?.text || '' },
            resolver: yupResolver(schema)
        }
    )
    ```

## 遅延ローディング
SPAの場合、bundleしているJavaScriptのモジュールが大きくなる場合、読み込みに時間がかかる場合、
遅延ローディングを実施することで、コンポーネントを必要なタイミングで別途読み込むことが可能。
それにより、初期ローディング時間を削減することができる。

### 遅延ローディング対象コンポーネントの指定
コンポーネントを遅延ローディング対象にするには、lazy関数を使用して、対象とする。
コンポーネントを指定する。

```
import React from "react"
import { AddMemberContainer } from "../components/pages/AddMember"
import { Counter } from "../components/pages/Counter"
import { MemberList } from "../components/pages/MemberList"
import { TestContainer } from "../components/pages/Test"
import { Todo } from "../components/pages/Todo"
import { TodoFormContainer } from "../components/pages/TodoForm"
import { TopContainer } from "../components/pages/Top"
import { ComponentMap, ContentItem } from "../Reducks/contents/types"
import { HeaderMenuItem } from "../Reducks/menu/types"

const TodoLazy = React.lazy(() => import('../components/pages/Todo').then(module => ({ default: module.Todo })))           // lazy関数でコンポーネントを指定
const MemberListLazy = React.lazy(() => import('../components/pages/MemberList').then(module => ({ default: module.MemberList })))　　// lazy関数でコンポーネントを指定

export const contentItems: ContentItem[] = [
  { link: '/', key: 'top', componentId: 'Top' },
  { link: '/counter', key: 'counter', componentId: 'Counter' },
  { link: '/member', key: 'member', componentId: 'MemberList' },
  { link: '/member/add', key: 'memberAdd', componentId: 'AddMember' },
  { link: '/todo', key: 'todo', componentId: 'Todo' },
  { link: '/todo/:id', key: 'todoForm', componentId: 'TodoForm' },
  { link: '/test', key: 'test', componentId: 'Test' },
]

export const headerMenuItems: HeaderMenuItem[] = [
  { text: 'Top', initialLink: '/' },
  { text: 'Counter', initialLink: '/counter' },
  { text: 'Member', initialLink: '/member' },
  { text: 'Todo', initialLink: '/todo' },
  { text: 'Test', initialLink: '/test' },
]

export const componentMap: ComponentMap = {
  'Top': TopContainer,
  'Counter': Counter,
  'MemberList': MemberListLazy,
  'Todo': TodoLazy,
  'TodoForm': TodoFormContainer,
  'Test': TestContainer,
  'AddMember': AddMemberContainer
};
```

### 遅延ローディング中のローディング
遅延ローディング実施時に、ローディング中の表示できない状態で表示するための<Suspense>要素は必須となる。
今回は、RouteLayoutの箇所で<Suspense>要素を指定した。fallbackにてローディング中に表示したいコンポーネントをしている。
```
import { Outlet } from "react-router-dom"
import { HeaderWithMenuLinks } from "../../uniqueParts/HeaderWithMenuLinks"
import { Suspense } from "react"

export const RouteLayout = () => {
    return (
        <div className="flex flex-col w-screen">
        <HeaderWithMenuLinks />
        <div className="flex flex-row h-full w-full bg-slate-100">
          <div>
            <Suspense fallback={<div>読み込み中</div>} >  // ここ
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    )
}
```

## Drag and　Drop
ReactでDrag and Dropを利用するため、以下を導入。
```
yarn add react-dnd react-dnd-html5-backend
```

## React-PDF-VIEWER
REACTでPDFの表示を容易するため、以下を導入
```
yarn add pdfjs-dist@3.4.120
yarn add @react-pdf-viewer/core @react-pdf-viewer/default-layout
```

pdf-viewerでは、PDFの表示処理をサポートするService-Workerを利用する。
そのため、pdfjs-distは、利用するService-Workerと同じバージョンのソフトウェアを導入する必要がある。

Service-Workerを利用するため、index.tsxに以下のタグを追加した。
```
root.render(
  <React.StrictMode>
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"> // このタグを追加
      <Provider store={store}>
        <App />
      </Provider>
    </Worker>
  </React.StrictMode>
```

## DatePickerコンポーネント

### react-datepicker導入

```
yarn add react-datepicker
yarn add -D @types/react-datepicker
```

### DatePickerを利用したコンポーネント作成

#### React-Hook-Formへの値受け渡し

DtePickerを利用するため、以下をインストールする。
React-hook-formの非制御に対応するDatePickerを利用したコンポーネントを作成。
ただ、DatePickerは、そのままでは、非制御に値を渡すことができない。
そのため、React-Hook-FormのsetValueメソッドを使用して、React-Hook-Form側に値を渡すメソッドを作成。
作成したメソッドをPropとして受け取ることで、Reat-Hook-Form側に値を渡すことが可能となった。

#### カレンダーからのみ更新

デフォルトでは、テキストボックスから自由入力ができ、かつ、カレンダーからも選択できる使用となっている。
カレンダーからのみ更新可能とする場合、customInputオプションを利用して、customInputは、入力項目を
カスタマイズできるオプションとなる。このオプションを使用して以下のように<p>タグに変更して、入力できないようにした。

```
customInput={<p className="block w-full p-2.5 border rounded bg-white">{selectedDate ? selectedDate.toLocaleString() : props.placeholder}</p>}
```

また、カレンダーIconを追加して、カレンダーIconのonClickに以下のメソッドを指定することでカレンダーの開閉ができるように以下の対応を実施。

```
  const handleCalendar = () => {
    if(datePickerRef.current?.isCalendarOpen){
      datePickerRef.current?.setOpen(true)
    } else {
      datePickerRef.current?.setOpen(false)
    }
  }
```

## Chart.js
### インストール
```
yarn add chart.js react-chartjs-2 @types/react-chartjs-2
```

#### ChartJS.registerの引数の解説
以下に、ChartJS.registerの引数として使用される各コンポーネントについて解説します。

1. CategoryScale
説明: カテゴリスケールは、X軸やY軸にカテゴリデータ（ラベル）を表示するために使用されます。例えば、月の名前や曜日などのカテゴリデータを表示する場合に使用されます。
使用例: ラベルが「January」「February」などのカテゴリデータである場合。
2. LinearScale
説明: 線形スケールは、数値データを表示するために使用されます。例えば、Y軸に数値データを表示する場合に使用されます。
使用例: データセットの値が数値である場合。
3. PointElement
説明: ポイント要素は、ラインチャートやスキャッターチャートでデータポイントを表示するために使用されます。各データポイントを円や他の形状で表示します。
使用例: ラインチャートで各データポイントを表示する場合。
4. LineElement
説明: ライン要素は、ラインチャートでデータポイントを結ぶ線を描画するために使用されます。
使用例: ラインチャートでデータポイントを結ぶ線を表示する場合。
5. Title
説明: タイトルプラグインは、グラフにタイトルを表示するために使用されます。タイトルの位置やスタイルを設定できます。
使用例: グラフの上部にタイトルを表示する場合。
6. Tooltip
説明: ツールチッププラグインは、データポイントにマウスオーバーしたときに表示されるツールチップを提供します。ツールチップにはデータポイントの詳細情報が表示されます。
使用例: データポイントにマウスオーバーしたときにツールチップを表示する場合。
7. Legend
説明: 凡例プラグインは、グラフに凡例を表示するために使用されます。凡例にはデータセットのラベルが表示されます。
使用例: グラフの上部や右側に凡例を表示する場合。
例: ChartJS.registerの使用
以下に、ChartJS.registerを使用してこれらのコンポーネントを登録する例を示します。

まとめ  
```
ChartJS.registerの引数として使用される各コンポーネントは、Chart.jsがグラフを描画するために必要な機能を提供します。これらのコンポーネントを登録することで、カテゴリデータや数値データのスケール、データポイントやラインの描画、タイトルやツールチップ、凡例の表示など、さまざまな機能をグラフに追加することができます。
```

#### datasetsの解説

1. label: データセットのラベルを指定します。凡例やツールチップに表示されます。
2. data: グラフに表示するデータの配列です。各要素はY軸の値を表します。
3. backgroundColor: 棒グラフの背景色を指定します。配列を指定することで、各棒に異なる色を設定することもできます。
4. borderColor: 棒グラフの枠線の色を指定します。配列を指定することで、各棒に異なる色を設定することもできます。
5. borderWidth: 棒グラフの枠線の幅を指定します。

#### optionsの解説

1. responsive: グラフがレスポンシブデザインに対応するかどうかを指定します。trueに設定すると、グラフがコンテナのサイズに応じて自動的にサイズを調整します。
2. plugins: プラグインに関する設定を行います。凡例やタイトル、ツールチップなどの設定を含みます。
   1. legend: 凡例の設定を行います。
      1. position: 凡例の位置を指定します。'top'、'bottom'、'left'、'right'などが指定できます。
   2. title: グラフのタイトルの設定を行います。
      1. display: タイトルを表示するかどうかを指定します。
      2. text: タイトルのテキストを指定します。
3. scales: 軸に関する設定を行います。X軸やY軸の設定を含みます。
   1. y: Y軸の設定を行います。
      1.  beginAtZero: Y軸の最小値を0にするかどうかを指定します。


まとめ  
```
datasetsとoptionsは、Chart.jsを使用してグラフを描画する際に重要な設定オブジェクトです。

datasets: グラフに表示するデータセットを定義します。各データセットに対してラベル、データ、背景色、枠線の色、枠線の幅などを設定できます。
options: グラフの表示や動作に関する設定を行います。レスポンシブ設定、凡例の位置、タイトルの表示、軸の設定などを含みます。
これらの設定を適切に行うことで、Chart.jsを使用してカスタマイズされたグラフを描画することができます。
```

## Error Boundary
ErrorBoundaryコンポーネントで配下のコンポーネントをくくると、配下のエラーが発生した場合、ErrorBoundaryで指定したコンポーネントを表示することができる。

### インストール
```
yarn add react-error-boundary
```

### ErrorBoundaryの利用
以下のようにErrorBoundaryコンポーネントでくくり、FallBackComponentでエラーに表示したいコンポーネントを指定する。

```
import { ErrorFallback } from "../ErrorFallback";
import { ErrorPresenter } from "./presenter"
import { ErrorBoundary } from 'react-error-boundary';

export const ErrorContainer = () => {
    return(
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ErrorPresenter />
        </ErrorBoundary>
    ) 
}
```

### エラー表示時のコンポーネント
```
import React from 'react';

export const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <div>
        <h1>エラーが発生しました。初めからやり直してください。</h1>
    </div>
);
```

## Re-ducksパターン

```
├── components
│   ├── pages # 各ページのコンポーネントを配置
│   │   └── [PageName]
│   │       ├── [ComponentName] # ページ特有のorganismsは限定コンポーネントとしてページ直下
│   │       │   ├── index.ts
│   │       │   ├── hooks.test.ts
│   │       │   ├── hooks.ts
│   │       │   ├── container.test.tsx
│   │       │   ├── container.tsx
│   │       │   ├── presenter.test.tsx
│   │       │   └── presenter.tsx
│   │       ├── index.ts
│   │       ├── hooks.ts
│   │       ├── hooks.test.ts
│   │       ├── container.tsx
│   │       ├── container.test.tsx
│   │       ├── presenter.tsx
│   │       └── presenter.test.tsx
│   ├── uiParts # 他プロジェクトでも利用可能な汎用パーツを格納
│   │   └── [ComponentName]
│   │       ├── index.ts
│   │       ├── hooks.ts
│   │       ├── hooks.test.ts
│   │       ├── container.tsx
│   │       ├── container.test.tsx
│   │       ├── presenter.tsx
│   │       └── presenter.test.tsx
│   └── uniqueParts  # organismsの内、ページをまたがる、かつ、プロジェクト特有のコンポーネント
│       └── [ComponentName]
│           ├── [ComponentName] # 各uniquePartsを更に分けたい場合は直下に置く
│           │   ├── index.ts
│           │   ├── hooks.test.ts
│           │   ├── hooks.ts
│           │   ├── container.test.tsx
│           │   ├── container.tsx
│           │   ├── presenter.test.tsx
│           │   └── presenter.tsx
│           ├── index.ts
│           ├── hooks.ts
│           ├── hooks.test.ts
│           ├── container.tsx
│           ├── container.test.tsx
│           ├── presenter.tsx
│           └── presenter.test.tsx
└── reducks # reducsパターンで管理
    ├── store
    │   ├── index.ts　　＃ reducerの統合する記述などを行う
    └── [各store]
        ├── index.ts
        ├── operations.ts
        ├── initializes.ts
        ├── selectors.ts
        ├── types.ts
        └── slices.ts
```


参考：https://zenn.dev/yuki_tu/articles/29e61e7634b272

## テスト
### Formテスト
```
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoForm } from './presenter'
import { todo } from '../../../Reducks/todo/types'

# テスト前準備メソッド
export const Setup = () => {
    const onClickButton = jest.fn()
    const onValid = jest.fn()
    const onInvalid = jest.fn()
    
    const typeTodo = async(todo:string) => {
        const textbox = screen.getByRole('textbox', {name: /todo/i})
        await userEvent.type(textbox, todo)
    }

    const typeTodoClear = async() => {
        const textbox = screen.getByRole('textbox', {name: /todo/i})
        await userEvent.clear(textbox)
    }

    const clickButton = async() => {
        await userEvent.click(screen.getByRole('button', {name: /create/i}))
    }

    const todo:todo = {id: 1, text: 'test', done: false}

    render(<TodoForm handleSubmit={onValid} handleError={onInvalid} todo={todo} loading={false} error={''} />)

    return { typeTodo, clickButton, typeTodoClear, onValid, onInvalid }
}

describe('Todoの編集Formのテスト', () => {
    test("Todo文字なしでCreateボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { typeTodoClear, clickButton } = Setup()
        await typeTodoClear()
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Todoの入力は必須です。')).toBeInTheDocument()
        })
    })
    
    test("2文字以下のTodo文字を入力してCreateボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { typeTodo, clickButton, typeTodoClear } = Setup()
        await typeTodoClear()
        await typeTodo('aa')
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Todoは、３文字以上入力してください。')).toBeInTheDocument()
        })
    })
    
    test("101文字以上のTodo文字を入力してCreateボタンをクリックするとエラーメッセージが表示されること", async() => {
        const { typeTodo, clickButton, typeTodoClear } = Setup()
        await typeTodoClear()
        await typeTodo('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        await clickButton()
        await waitFor(()=>{
            expect(screen.getByText('Todoは、最大１００文字となります。')).toBeInTheDocument()
        })
    })
    
    test("適切な文字を入力してCreateボタンをクリックするとhandleSubmitが呼ばれること", async() => {
        const { typeTodo, clickButton, onValid, onInvalid } = Setup()
        await typeTodo('test')
        await clickButton()
        await waitFor(()=>{
            expect(onValid).toHaveBeenCalled()
            expect(onInvalid).not.toHaveBeenCalled()
        })
    })
    
    test("不適切な文字の状態でCreateボタンをクリックするとonSubmitErrorが呼ばれること", async() => {
        const { typeTodoClear, clickButton, onValid, onInvalid } = Setup()
        await typeTodoClear()
        await clickButton()
        await waitFor(()=>{
            expect(onValid).not.toHaveBeenCalled()
            expect(onInvalid).toHaveBeenCalled()
        })
    })
})
```

## Reduxのslicers（Redux-thunk）
```
import { memberReducer,fetchMemberItemsAsync } from './slices';
import { configureStore } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { initialState } from './initializes';

const mock = new MockAdapter(axios);

describe('memberのslicesのテスト', () => {

  it('初期値のテスト', () => {
    expect(memberReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('fetchMemberItemsAsyncが情報取得中の場合', () => {
    const action = { type: fetchMemberItemsAsync.pending.type };
    const state = memberReducer(initialState, action);
    expect(state).toEqual({
      member: [],
      loading: true,
      error: null,
    });
  });

  it('fetchMemberItemsAsyncが情報取得できた場合', async () => {
    const member = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    ];
    mock.onGet('http://localhost:8080/member').reply(200, member);

    const store = configureStore({ reducer: memberReducer });
    await store.dispatch(fetchMemberItemsAsync());

    const state = store.getState();
    expect(state).toEqual({
      member,
      loading: false,
      error: null,
    });
  });

  it('fetchMemberItemsAsyncが情報取得失敗した場合', async () => {
    mock.onGet('http://localhost:8080/member').reply(500);

    const store = configureStore({ reducer: memberReducer });
    await store.dispatch(fetchMemberItemsAsync());

    const state = store.getState();
    expect(state).toEqual({
      member: [],
      loading: false,
      error: 'Request failed with status code 500',
    });
  });
});
```

## テーブルコンポーネントテスト
```
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import { BasicTable } from './presenter'

interface TestItem {
    id: number
    name: string
    active: string
    [key: string]: string | number | boolean
}

describe('BasicTable', () => {
    test('データがない場合、 "データがありません。" が表示されること', () => {
        render(<BasicTable<TestItem> titleHeader={['ID', 'Name', 'Active']} items={null} />)
        expect(screen.getByText('データがありません。')).toBeInTheDocument()
    })

    test('itemsの数だけrowが表示されること', () => {
        const items: TestItem[] = [
            { id: 1, name: 'Item 1', active: 'true' },
            { id: 2, name: 'Item 2', active: 'false' },
        ]
        render(<BasicTable<TestItem> titleHeader={['id', 'name', 'active']} items={items} />)
        expect(screen.getAllByRole('row')).toHaveLength(3)
    })

    test('表のヘッダーとデータが正しく表示されること', () => {
        const items: TestItem[] = [
            { id: 1, name: 'Item 1', active: 'true' },
            { id: 2, name: 'Item 2', active: 'false' },
        ]
        render(<BasicTable<TestItem> titleHeader={['id', 'name', 'active']} items={items} />)

        // Check headers
        expect(screen.getByText('id')).toBeInTheDocument()
        expect(screen.getByText('name')).toBeInTheDocument()
        expect(screen.getByText('active')).toBeInTheDocument()

        // Check data
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('Item 1')).toBeInTheDocument()
        expect(screen.getByText('true')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('Item 2')).toBeInTheDocument()
        expect(screen.getByText('false')).toBeInTheDocument()

        expect(screen.getAllByRole('row')).toHaveLength(3)
    })
})
```