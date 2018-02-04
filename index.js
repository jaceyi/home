const express = require('express')
const app = express()
const web = require('./node/web')
const admin = require('./node/admin')
const myPublic = require('./node/public')
const fm = require('formidable')
const db = require('./node/db')
const common = require('./node/common')

app.get('/wordList', function (req, res) {
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

app.post('/writeWord', function (req, res) {
  const form = new fm.IncomingForm()
  form.parse(req, (err, fields) => {
    const myDate = new Date()
    const year = myDate.getFullYear()
    const month = Number(myDate.getMonth()) + 1
    const date = myDate.getDate()
    const Minute = String(myDate.getMinutes()).length > 1 ? myDate.getMinutes() : '0' + myDate.getMinutes()
    const Hours = String(myDate.getHours()).length > 1 ? myDate.getHours() : '0' + myDate.getHours()
    const name = fields.name
    const img = fields.img
    const content = fields.content
    const time = year + '-' + month + '-' + date + ' ' + Hours + ':' + Minute
    if (!name) {
      publics.endJson(res, {
        code: 400,
        msg: 'name 字段不能为空'
      })
    }
    if (!content) {
      publics.endJson(res, {
        code: 400,
        msg: 'content 字段不能为空'
      })
    }
    const sql = 'insert into word(id,name,img,content,time) values(0,?,?,?,?)'
    const data = [name, img, content, time]
    db.addData(
      sql,
      data,
      (o) => {
        if (!o.err) {
          publics.endJson(res, {
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

app.use('/public', myPublic)

app.use('/admin', admin)

app.use('/', web)

app.listen(3000)
