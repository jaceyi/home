import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './App/App';
import reactStore from './store/store';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from 'antd';
import './base.scss';

const store = createStore(reactStore);

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <HashRouter>
        <App/>
      </HashRouter>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
