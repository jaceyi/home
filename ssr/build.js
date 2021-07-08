import React from 'react';
import App from '../src/App';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const html = renderToString(<App />);

ejs.renderFile(
  path.resolve(__dirname, '../src/template.ejs'),
  {
    htmlContent: html
  },
  (err, data) => {
    if (!err) {
      fs.writeFileSync(
        path.resolve(__dirname, '../public/index.html'),
        data,
        'utf-8'
      );
      console.log('build success!');
    } else {
      console.error('build success!');
    }
  }
);
