/// <reference path="node.d.ts"/>

import {readFile} from 'fs';
import * as express from 'express';
import * as http from 'http';
import chat from './modules/chat';

const app = express();
const h = http.Server(app);
chat(h);

app.use('/', express.static('home'));
app.use('/public', express.static('public'));
app.use('/files', express.static('files'));

app.use('/admin', express.static('admin'));

app.use(function(req, res) {
  readFile('error/404.html', function (error, data) {
    if (error) {
      res.status(404).end(JSON.stringify(error));
    }
    res.status(404).end(data);
  });
});

h.listen(3000, function(){
  console.log('listening on *:3000');
});
