import * as express from 'express';

const app = express();

app.use('/', express.static('public/home'));
app.use('/', express.static('public'));

app.use(function(req, res) {
  res.status(404).end('404');
});

app.listen(3000);
