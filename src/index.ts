/// <reference path="node.d.ts"/>

import {readFile} from 'fs';
import * as express from 'express';
import * as http from 'http';
import * as socket from 'socket.io';

const app = express();
const h = http.Server(app);
const io = socket(h);

app.use('/', express.static('index'));
app.use('/public', express.static('public'));
app.use('/files', express.static('files'));

app.use(function(req, res) {
  readFile('error/404.html', function (error, data) {
    if (error) {
      res.status(404).end(JSON.stringify(error));
    }
    res.status(404).end(data);
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(info){
    io.emit('chat message', info);
  });
});

h.listen(3000, function(){
  console.log('listening on *:3000');
});
