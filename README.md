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
- jest-environment-jsdom
- axios-mock-adapter
  
```
# jest.config.js
module.exports = {
    testEnvironment: "jest-environment-jsdom",
}
```

# jestのEM６対応
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

### Redux
```
yarn add redux react-redux typescript-fsa typescript-fsa-reducers 
```
```
yarn add @reduxjs/toolkit
```

### react-router-dom
```
yarn add react-router-dom
```

### tailWindcss
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
