module.exports = {
  queryData,
  addData,
  changeData,
  deleteData
}

const mysql = require('mysql')
const servetConfig = require('./server_config')

const connection = mysql.createConnection(servetConfig)

connection.connect()

function queryData (sql, cb) {
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
}

function addData (sql, params, cb) {
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
}

function changeData (sql, params, cb) {
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
}

function deleteData (sql, params, cb) {
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
}
