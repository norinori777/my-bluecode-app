// server.js
const express = require('express');
const cors = require('cors'); // CORSミドルウェアをインポート
const app = express();
const port = 8080;

app.use(cors()); // CORSミドルウェアを使用

app.get('/member', (req, res) => {
  const members = [
    { id: 1, name: 'Taro Yamada', email: 'taro.yamada@example.com' },
    { id: 2, name: 'Jiro Yamada', email: 'jiro.yamada@example.com' },
    { id: 3, name: 'Saburo Yamada', email: 'saburo.yamada@example.com' },
    { id: 4, name: 'Shiro Yamada', email: 'Shiro.yamada@example.com' },
  ];
  res.json(members);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/todo', (req, res) => {
  const todos = [
    { id: 1, title: 'Buy the milk', done: false },
    { id: 2, title: 'Pay the bill', done: true },
    { id: 3, title: 'Go to the gym', done: false },
  ];
  res.json(todos);
});