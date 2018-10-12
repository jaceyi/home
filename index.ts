/// <reference path="src/node.d.ts"/>

import {resolve} from 'path';
import {Server} from 'http';
import * as express from 'express';
import chat from './src/modules/chat';

const app = express();
const http = new Server(app);
chat(http);

app.get('/api/getUserInfo', function (req, res) {
  res.json({
    name: 'Jace',
    age: 18
  });
});

// 静态资源
app.use('/public', express.static('public'));
// 文件
app.use('/files', express.static('files'));
// 后台管理
app.use('/admin', express.static('admin/dist'));
// 首页
app.use('/', express.static('home'));

app.use(function(req, res) {
  // 检测404状态，返回404页面
  res.status(404).sendFile(resolve('/error/404.html'), {
    root: __dirname
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
