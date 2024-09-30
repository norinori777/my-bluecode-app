# リファレンス
## 導入
### React TypeScript
```
npx create-react-app ./ --template typescript
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
npx tailwindcss -i ./src/css/style.css -o ./public/css/style.css --watch
```

## redux-toolkit
- slices.tsを作成すると、actionも自動的に作成してくれ、Reduxでよく言われるボイラープレートの改善がされている。
- storeの更新時にスプレッド構文を利用してStoreを更新していたが、その対応も不要となった。
- 

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


## 参考
https://zenn.dev/yuki_tu/articles/29e61e7634b272
