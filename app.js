const path = require('path');
const express = require('express');

const app = express();

// 首页
app.use(express.static(__dirname));

app.use(function(req, res) {
  // 检测404状态，返回404页面
  res.status(404).sendFile(path.resolve('/error/404.html'), {
    root: __dirname
  });
});

app.listen(3000, function() {
  console.log('listening on *:3000');
});
