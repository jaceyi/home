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

function queryData (sheet, cb) {
  const sql = 'SELECT * FROM ' + sheet
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

function addData (sheet, addParams, cb) {
  let sql = 'INSERT INTO ' + sheet + '(id,'
  let sqlTail = ') VALUES(0,'
  let params = []
  for (let key in addParams) {
    sql += key + ','
    sqlTail += '?,'
    params.push(addParams[key])
  }
  sql = sql.slice(0, sql.length - 1)
  sqlTail = sqlTail.slice(0, sqlTail.length - 1)
  sql += sqlTail + ')'
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

function changeData (sheet, changeParams, cb) {
  let sql = 'UPDATE ' + sheet + ' SET '
  let params = []
  for (let key in changeParams) {
    sql += key + '=?,'
    params.push(changeParams[key])
  }
  sql = sql.slice(0, sql.length - 1)
  sql += 'WHERE Id = ?'

  connection.query(sql, changeParams, function (err, result) {
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

function deleteData (sheet, deleteParams, cb) {
  const sql = 'DELETE FROM ' + sheet + ' where id=' + deleteParams.id
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
