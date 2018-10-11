/// <reference path="node.d.ts"/>

import {readFile} from 'fs';
import {Server} from 'http';
import * as express from 'express';
import chat from './modules/chat';

const app = express();
const http = Server(app);
chat(http);

app.use('/', express.static('home'));
app.use('/public', express.static('public'));
app.use('/files', express.static('files'));
app.use('/admin', express.static('admin/dist'));

app.get('/api/getUserInfo', function (req, res) {
  res.json({
    name: 'Jace',
    age: 18
  });
  res.end()
});

app.use(function(req, res) {
  readFile('error/404.html', function (error, data) {
    if (error) {
      res.status(404).end(JSON.stringify(error));
    }
    res.status(404).end(data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
