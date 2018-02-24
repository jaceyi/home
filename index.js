const express = require('express')
const app = express()
const web = require('./node/web')
const admin = require('./node/admin')
const myPublic = require('./node/public')
const fm = require('formidable')
const db = require('./node/db')
const common = require('./node/common')

app.get('/getWord', function (req, res) {
  const page = req.query.page
  const num = req.query.num || 10
  const sql = 'select * from word order by id desc limit ' + ((page - 1) * num) + ',' + num
  db.queryData(sql, (o) => {
    if (!o.err) {
      common.endJson(res, {
        code: 200,
        data: o
      })
    }
  })
})

app.post('/setWord', function (req, res) {
  const form = new fm.IncomingForm()
  form.parse(req, (err, fields) => {
    const myDate = new Date()
    const year = myDate.getFullYear()
    const month = Number(myDate.getMonth()) + 1
    const date = myDate.getDate()
    const Minute = String(myDate.getMinutes()).length > 1 ? myDate.getMinutes() : '0' + myDate.getMinutes()
    const Hours = String(myDate.getHours()).length > 1 ? myDate.getHours() : '0' + myDate.getHours()
    const {
      name,
      img,
      content
    } = fields
    const time = year + '-' + month + '-' + date + ' ' + Hours + ':' + Minute
    if (!name || !content) {
      common.endJson(res, {
        code: 400,
        msg: '请将内容填写完整'
      })
    }
    const sql = 'insert into word(id,name,img,content,time) values(0,?,?,?,?)'
    const data = [name, img, content, time]
    db.addData(
      sql,
      data,
      (o) => {
        if (!o.err) {
          common.endJson(res, {
            code: 200,
            msg: '留言成功',
            data: {
              id: o.insertId,
              name: name,
              img: img,
              content: content,
              time: time
            }
          })
        }
      })
  })
})

// 获取 个人信息
function getPersonal (req, res, cb) {
  const sql = 'select * from personal'
  db.queryData(sql, (o) => {
    cb(o)
  })
}

app.get('/getPersonal', function (req, res) {
  getPersonal(req, res, (o) => {
    if (!o.err) {
      common.endJson(res, {
        code: 200,
        data: o
      })
    }
  })
})

app.post('/setPersonal', function (req, res) {
  const form = new fm.IncomingForm()
  form.parse(req, (err, fields) => {
    const {
      name,
      gender,
      birthDate,
      mobile,
      qqCode,
      address,
      hometown
    } = fields
    if (!name || !gender || ! birthDate || ! mobile || !qqCode || !address || !hometown) {
      common.endJson(res, {
        code: 400,
        msg: '请将内容填写完整'
      })
    }
    getPersonal(req, res, (o) => {
      if (!o.err) {
        const data = [name, gender, birthDate, mobile, qqCode, address, hometown]
        const callback = (o_) => {
          if (!o_.err) {
            common.endJson(res, {
              code: 200,
              data: data,
              msg: '保存成功'
            })
          }
        }
        if (o.length) {
          const sql = 'update personal set name = ?, gender = ?, birthDate = ?, mobile = ?, qqCode = ?, address = ?, hometown = ? where id = 1'
          db.changeData(
            sql,
            data,
            callback
          )
        } else {
          const sql = 'insert into personal(id, name, gender, birthDate, mobile, qqCode, address, hometown) value(0, ?, ?, ?, ?, ?, ?, ?)'
          db.addData(
            sql,
            data,
            callback
          )
        }
      }
    })
  })
})

app.use('/public', myPublic)

app.use('/admin', admin)

app.use('/', web)

app.listen(3000)
