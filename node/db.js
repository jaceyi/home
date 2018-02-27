module.exports = {
  queryData,
  addData,
  changeData,
  deleteData
}

const mysql = require('mysql')
const servetConfig = require('./server_config')

let connection = null

const connectSql = function (cb) {
  connection = mysql.createConnection(servetConfig)
  connection.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectSql()
    }
  })
  if (cb) {
    cb()
  }
}

connectSql()

function queryData (sql, params, cb) {
  connectSql(() => {
    connection.query(sql, params, function (err, result) {
      if (err) {
        const errMsg = {
          err: true,
          msg: err
        }
        cb(errMsg)
        return
      }
      cb(result)
    })
  })
}

function addData (sql, params, cb) {
  connectSql(() => {
    connection.query(sql, params, function (err, result) {
      if (err) {
        const errMsg = {
          err: true,
          msg: err
        }
        cb(errMsg)
        return
      }
      cb(result)
    })
  })
}

function changeData (sql, params, cb) {
  connectSql(() => {
    connection.query(sql, params, function (err, result) {
      if (err) {
        const errMsg = {
          err: true,
          msg: err
        }
        cb(errMsg)
        return
      }
      cb(result)
    })
  })
}

function deleteData (sql, cb) {
  connectSql(() => {
    connection.query(sql, function (err, result) {
      if (err) {
        const errMsg = {
          err: true,
          msg: err
        }
        cb(errMsg)
        return
      }
      cb(result)
    })
  })
}
