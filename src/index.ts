/// <reference path="node.d.ts"/>

import * as express from 'express';
import {readFile} from 'fs';

const app = express();

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

app.listen(3000);
