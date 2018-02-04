module.exports = {
  queryData,
  addData,
  changeData,
  deleteData
}

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '01.23Wsr',
  database: 'my_web'
})

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
