const path = require('path');
const express = require('express');

const app = express();

// 首页
app.use(express.static(path.resolve(__dirname, 'public/')));

app.use(function (req, res) {
  // 检测404状态，返回404页面
  res.status(404).sendFile(path.resolve(__dirname, 'public/error/404.html'));
});

app.listen(3000, function () {
  console.log('listening on *:3000');
});
