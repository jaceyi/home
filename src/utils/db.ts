import * as mysql from 'mysql';
import config from '../../config';

function _handleError(err) {
  // 针对sql错误做出处理
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR' || err.code === 'ETIMEDOUT') {
      connectSql()
    } else {
      console.log(err)
    }
  }
}

let db = null;

function connectSql() {
  db = mysql.createConnection(config);
  db.connect(_handleError);
  db.on('error', _handleError);
}
connectSql();

// QAQ 想不到怎么封装一个通用的sql操作方法还是先不封装了
export default db;
