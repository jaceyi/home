import {resolve} from 'path';
import {Server} from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import chat from './src/modules/chat';
import * as handles from './src/modules/handles';

const app = express();
const http = new Server(app);
chat(http);

// 添加请求body参数解析
app.use(bodyParser.json());
// 代理全部的api请求
app.all('/api/:apiPath', function(req, res) {
  const _handle = handles[req.params.apiPath];
  if (_handle) {
    _handle(req, res);
  } else {
    res.sendStatus(404);
  }
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

http.listen(3000, function() {
  console.log('listening on *:3000');
});
