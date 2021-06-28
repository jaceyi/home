import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root');

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(<App />, root);
} else {
  ReactDOM.hydrate(<App />, root);
}
