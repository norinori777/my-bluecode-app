// server.js
const express = require('express');
const cors = require('cors'); // CORSミドルウェアをインポート
const app = express();
const port = 8080;

app.use(express.json()); // Add this middleware to parse JSON bodies
app.use(cors()); // CORSミドルウェアを使用

app.get('/member', (req, res) => {
  const members = [
    { id: 1, position: 'admin', name: 'Taro Yamada', email: 'taro.yamada@example.com', status: false },
    { id: 2, position: 'general', name: 'Jiro Yamada', email: 'jiro.yamada@example.com', status: true },
    { id: 3, position: 'general', name: 'Saburo Yamada', email: 'saburo.yamada@example.com', status: false },
    { id: 4, position: 'admin', name: 'Shiro Yamada', email: 'Shiro.yamada@example.com', status: true },
  ];
  res.json(members);
});


app.post('/member/add', (req, res) => {
  const members = [
    { id: 1, position: 'admin', name: 'Taro Yamada', email: 'taro.yamada@example.com', status: false },
    { id: 2, position: 'general', name: 'Jiro Yamada', email: 'jiro.yamada@example.com', status: true },
    { id: 3, position: 'general', name: 'Saburo Yamada', email: 'saburo.yamada@example.com', status: false },
    { id: 4, position: 'admin', name: 'Shiro Yamada', email: 'Shiro.yamada@example.com', status: true },
    { id: 5, position: 'admin', name: 'Goro Yamada', email: 'Goro.yamada@example.com', status: true },

  ];
  res.json(members);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/todo', (req, res) => {
  const todos = [
    { id: 1, text: 'Buy the milk', done: false },
    { id: 2, text: 'Pay the bill', done: true },
    { id: 3, text: 'Go to the gym', done: false },
  ];
  res.json(todos);
});

app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  const todos = [
    { id: 1, text: 'Buy the milk', done: false },
    { id: 2, text: 'Pay the bill', done: true },
    { id: 3, text: 'Go to the gym', done: false },
  ];
  const todo = todos.find((todo) => todo.id === Number(id));
  todo.done = !todo.done;
  res.json(todo);
});

app.put('/todo/text/:id', (req, res) => {
  const id = req.params.id;
  const todos = [
    { id: 1, text: 'Buy the milk', done: false },
    { id: 2, text: 'Pay the bill', done: true },
    { id: 3, text: 'Go to the gym', done: false },
  ];
  const todo = todos.find((todo) => todo.id === Number(id));
  todo.text = req.body.text;
  res.json(todo);
});

app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  const todos = [
    { id: 1, text: 'Buy the milk', done: false },
    { id: 2, text: 'Pay the bill', done: true },
    { id: 3, text: 'Go to the gym', done: false },
  ];
  const todo = todos.find((todo) => todo.id === Number(id));
  todos.splice(todos.indexOf(todo), 1);
  res.json(todo);
});

app.get('/test', (req, res) => {
  const test = { test: 'Very Good' }
  setTimeout(() => {
    res.json(test);
  }, 10000);
  // res.json(test);
});