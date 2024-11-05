// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
 // CORSミドルウェアをインポート
const app = express();
const port = 8080;

app.use(express.json()); // Add this middleware to parse JSON bodies
app.use(cors()); // CORSミドルウェアを使用

app.get('/member', (req, res) => {
  const members = [
    { id: '1', position: 'admin', name: 'Taro Yamada', email: 'taro.yamada@example.com', status: false },
    { id: '2', position: 'general', name: 'Jiro Yamada', email: 'jiro.yamada@example.com', status: true },
    { id: '3', position: 'general', name: 'Saburo Yamada', email: 'saburo.yamada@example.com', status: false },
    { id: '4', position: 'admin', name: 'Shiro Yamada', email: 'Shiro.yamada@example.com', status: true },
    { id: '5', position: 'admin', name: 'Goro Yamada', email: 'goro.yamada@example.com', status: true },
    { id: '6', position: 'general', name: 'Rokuro Yamada', email: 'rokuro.yamada@example.com', status: false },
    { id: '7', position: 'general', name: 'Shichiro Yamada', email: 'shichiro.yamada@example.com', status: true },
    { id: '8', position: 'admin', name: 'Hachiro Yamada', email: 'hachiro.yamada@example.com', status: false },
    { id: '9', position: 'general', name: 'Kuro Yamada', email: 'kuro.yamada@example.com', status: true },
    { id: '10', position: 'admin', name: 'Juro Yamada', email: 'juro.yamada@example.com', status: false },
    { id: '11', position: 'hoge', name: 'Ichiro Yamada', email: 'ichiro.yamada@example.com', status: true },
    { id: '12', position: 'hoge', name: 'Nijiro Yamada', email: 'nijiro.yamada@example.com', status: false },
    // { id: 13, position: 'general', name: 'Sanjuro Yamada', email: 'sanjuro.yamada@example.com', status: true },
    // { id: 14, position: 'admin', name: 'Shijiro Yamada', email: 'shijiro.yamada@example.com', status: false },
    // { id: 15, position: 'general', name: 'Gojuro Yamada', email: 'gojuro.yamada@example.com', status: true },
    // { id: 16, position: 'admin', name: 'Rokujuro Yamada', email: 'rokujuro.yamada@example.com', status: false },
    // { id: 17, position: 'general', name: 'Shichijuro Yamada', email: 'shichijuro.yamada@example.com', status: true },
    // { id: 18, position: 'admin', name: 'Hachijuro Yamada', email: 'hachijuro.yamada@example.com', status: false },
    // { id: 19, position: 'general', name: 'Kujuro Yamada', email: 'kujuro.yamada@example.com', status: true },
    // { id: 20, position: 'admin', name: 'Jujuro Yamada', email: 'jujuro.yamada@example.com', status: false },
    // { id: 21, position: 'general', name: 'Ichijuro Yamada', email: 'ichijuro.yamada@example.com', status: true },
    // { id: 22, position: 'admin', name: 'Nijijuro Yamada', email: 'nijijuro.yamada@example.com', status: false },
    // { id: 23, position: 'general', name: 'Sanjijuro Yamada', email: 'sanjijuro.yamada@example.com', status: true },
    // { id: 24, position: 'admin', name: 'Shijijuro Yamada', email: 'shijijuro.yamada@example.com', status: false },
    // { id: 25, position: 'general', name: 'Gojijuro Yamada', email: 'gojijuro.yamada@example.com', status: true },
    // { id: 26, position: 'admin', name: 'Rokujijuro Yamada', email: 'rokujijuro.yamada@example.com', status: false },
    // { id: 27, position: 'general', name: 'Shichijijuro Yamada', email: 'shichijijuro.yamada@example.com', status: true },
    // { id: 28, position: 'admin', name: 'Hachijijuro Yamada', email: 'hachijijuro.yamada@example.com', status: false },
    // { id: 29, position: 'general', name: 'Kujijuro Yamada', email: 'kujijuro.yamada@example.com', status: true },
    // { id: 30, position: 'admin', name: 'Jujijuro Yamada', email: 'jujijuro.yamada@example.com', status: false },
    // { id: 31, position: 'general', name: 'Ichijijuro Yamada', email: 'ichijijuro.yamada@example.com', status: true },
    // { id: 32, position: 'admin', name: 'Nijijijuro Yamada', email: 'nijijijuro.yamada@example.com', status: false },
    // { id: 33, position: 'general', name: 'Sanjijijuro Yamada', email: 'sanjijijuro.yamada@example.com', status: true },
    // { id: 34, position: 'admin', name: 'Shijijijuro Yamada', email: 'shijijijuro.yamada@example.com', status: false },
    // { id: 35, position: 'general', name: 'Gojijijuro Yamada', email: 'gojijijuro.yamada@example.com', status: true },
    // { id: 36, position: 'admin', name: 'Rokujijijuro Yamada', email: 'rokujijijuro.yamada@example.com', status: false },
    // { id: 37, position: 'general', name: 'Shichijijijuro Yamada', email: 'shichijijijuro.yamada@example.com', status: true },
    // { id: 38, position: 'admin', name: 'Hachijijijuro Yamada', email: 'hachijijijuro.yamada@example.com', status: false },
    // { id: 39, position: 'general', name: 'Kujijijuro Yamada', email: 'kujijijuro.yamada@example.com', status: true },
    // { id: 40, position: 'admin', name: 'Jujijijuro Yamada', email: 'jujijijuro.yamada@example.com', status: false },
    // { id: 41, position: 'general', name: 'Ichijijijuro Yamada', email: 'ichijijijuro.yamada@example.com', status: true },
    // { id: 42, position: 'admin', name: 'Nijijijijuro Yamada', email: 'nijijijijuro.yamada@example.com', status: false },
    // { id: 43, position: 'general', name: 'Sanjijijijuro Yamada', email: 'sanjijijijuro.yamada@example.com', status: true },
    // { id: 44, position: 'admin', name: 'Shijijijijuro Yamada', email: 'shijijijijuro.yamada@example.com', status: false },
    // { id: 45, position: 'general', name: 'Gojijijijuro Yamada', email: 'gojijijijuro.yamada@example.com', status: true },
    // { id: 46, position: 'admin', name: 'Rokujijijijuro Yamada', email: 'rokujijijijuro.yamada@example.com', status: false },
    // { id: 47, position: 'general', name: 'Shichijijijijuro Yamada', email: 'shichijijijijuro.yamada@example.com', status: true },
    // { id: 48, position: 'admin', name: 'Hachijijijijuro Yamada', email: 'hachijijijijuro.yamada@example.com', status: false },
    // { id: 49, position: 'general', name: 'Kujijijijuro Yamada', email: 'kujijijijuro.yamada@example.com', status: true },
    // { id: 50, position: 'admin', name: 'Jujijijijuro Yamada', email: 'jujijijijuro.yamada@example.com', status: false },
    // { id: 51, position: 'general', name: 'Ichijijijijuro Yamada', email: 'ichijijijijuro.yamada@example.com', status: true },
    // { id: 52, position: 'admin', name: 'Nijijijijijuro Yamada', email: 'nijijijijijuro.yamada@example.com', status: false },
    // { id: 53, position: 'general', name: 'Sanjijijijijuro Yamada', email: 'sanjijijijijuro.yamada@example.com', status: true },
    // { id: 54, position: 'admin', name: 'Shijijijijijuro Yamada', email: 'shijijijijijuro.yamada@example.com', status: false },
    // { id: 55, position: 'general', name: 'Gojijijijijuro Yamada', email: 'gojijijijijuro.yamada@example.com', status: true },
    // { id: 56, position: 'admin', name: 'Rokujijijijijuro Yamada', email: 'rokujijijijijuro.yamada@example.com', status: false },
    // { id: 57, position: 'general', name: 'Shichijijijijijuro Yamada', email: 'shichijijijijijuro.yamada@example.com', status: true },
    // { id: 58, position: 'admin', name: 'Hachijijijijijuro Yamada', email: 'hachijijijijijuro.yamada@example.com', status: false },
    // { id: 59, position: 'general', name: 'Kujijijijijuro Yamada', email: 'kujijijijijuro.yamada@example.com', status: true },
    // { id: 60, position: 'admin', name: 'Jujijijijijuro Yamada', email: 'jujijijijijuro.yamada@example.com', status: false },
    // { id: 61, position: 'general', name: 'Ichijijijijijuro Yamada', email: 'ichijijijijijuro.yamada@example.com', status: true },
    // { id: 62, position: 'admin', name: 'Nijijijijijijuro Yamada', email: 'nijijijijijijuro.yamada@example.com', status: false },
    // { id: 63, position: 'general', name: 'Sanjijijijijijuro Yamada', email: 'sanjijijijijijuro.yamada@example.com', status: true },
    // { id: 64, position: 'admin', name: 'Shijijijijijijuro Yamada', email: 'shijijijijijijuro.yamada@example.com', status: false },
    // { id: 65, position: 'general', name: 'Gojijijijijijuro Yamada', email: 'gojijijijijijuro.yamada@example.com', status: true },
    // { id: 66, position: 'admin', name: 'Rokujijijijijijuro Yamada', email: 'rokujijijijijijuro.yamada@example.com', status: false },
    // { id: 67, position: 'general', name: 'Shichijijijijijijuro Yamada', email: 'shichijijijijijijuro.yamada@example.com', status: true },
    // { id: 68, position: 'admin', name: 'Hachijijijijijijuro Yamada', email: 'hachijijijijijijuro.yamada@example.com', status: false },
    // { id: 69, position: 'general', name: 'Kujijijijijijuro Yamada', email: 'kujijijijijijuro.yamada@example.com', status: true },
    // { id: 70, position: 'admin', name: 'Jujijijijijijuro Yamada', email: 'jujijijijijijuro.yamada@example.com', status: false },
    // { id: 71, position: 'general', name: 'Ichijijijijijijuro Yamada', email: 'ichijijijijijijuro.yamada@example.com', status: true },
    // { id: 72, position: 'admin', name: 'Nijijijijijijijuro Yamada', email: 'nijijijijijijijuro.yamada@example.com', status: false },
    // { id: 73, position: 'general', name: 'Sanjijijijijijijuro Yamada', email: 'sanjijijijijijijuro.yamada@example.com', status: true },
    // { id: 74, position: 'admin', name: 'Shijijijijijijijuro Yamada', email: 'shijijijijijijijuro.yamada@example.com', status: false },
    // { id: 75, position: 'general', name: 'Gojijijijijijijuro Yamada', email: 'gojijijijijijijuro.yamada@example.com', status: true },
    // { id: 76, position: 'admin', name: 'Rokujijijijijijijuro Yamada', email: 'rokujijijijijijijuro.yamada@example.com', status: false },
    // { id: 77, position: 'general', name: 'Shichijijijijijijijuro Yamada', email: 'shichijijijijijijijuro.yamada@example.com', status: true },
    // { id: 78, position: 'admin', name: 'Hachijijijijijijijuro Yamada', email: 'hachijijijijijijijuro.yamada@example.com', status: false },
    // { id: 79, position: 'general', name: 'Kujijijijijijijuro Yamada', email: 'kujijijijijijijuro.yamada@example.com', status: true },
    // { id: 80, position: 'admin', name: 'Jujijijijijijijuro Yamada', email: 'jujijijijijijijuro.yamada@example.com', status: false },
    // { id: 81, position: 'general', name: 'Ichijijijijijijijuro Yamada', email: 'ichijijijijijijijuro.yamada@example.com', status: true },
    // { id: 82, position: 'admin', name: 'Nijijijijijijijijuro Yamada', email: 'nijijijijijijijijuro.yamada@example.com', status: false },
    // { id: 83, position: 'general', name: 'Sanjijijijijijijijuro Yamada', email: 'sanjijijijijijijijuro.yamada@example.com', status: true },
    // { id: 84, position: 'admin', name: 'Shijijijijijijijijuro Yamada', email: 'shijijijijijijijijuro.yamada@example.com', status: false },
    // { id: 85, position: 'general', name: 'Gojijijijijijijijuro Yamada', email: 'gojijijijijijijijuro.yamada@example.com', status: true }
  ];
  res.json(members);
});

app.delete('/member/delete/:id', (req, res) => {
  console.log("delete ID:" + req.params.id);
  const id = req.params.id;
  return res.json({ id: id });
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

const upload = multer();

app.post('/file/add', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ file: req.file });
});

app.post('/file/add2', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }
  if (req.file.mimetype !== 'application/pdf') {
    return res.status(400).send('Uploaded file is not a PDF.');
  }
  const base64File = req.file.buffer.toString('base64')
  res.json({ file: base64File, filename: req.file.originalname, mimetype: req.file.mimetype });
});