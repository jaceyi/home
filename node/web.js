const express = require('express')
const web = express()
const fs = require('fs')
const path = require('path')
const fm = require('formidable')
const db = require('./db')
const publics = require('./public')
const fileUrl = './web/dist/'

web.get('/writeList', function (req, res) {
  const page = req.query.page
  console.log(page)
  res.end()
})

web.post('/writeWord', function (req, res) {
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
    const data = {
      name: name,
      img: img,
      content: content,
      time: time
    }
    db.addData('word',
      data,
      (o) => {
        if (!o.err) {
          publics.endJson(res, {
            code: 200,
            msg: '留言成功'
          })
        }
      })
  })
})

web.use('/', function (req, res) {
  let pathname = req.url
  if (pathname === '/') {
    pathname = 'index.html'
  }
  const extname = path.extname(pathname)
  fs.readFile(fileUrl + pathname, (err, data) => {
    if (err) {
      fs.readFile('./error/error.html', (err, data) => {
        if (err) {
          req.send(err)
        }
        res.writeHead(404, {'Content-type': 'text/html'})
        res.end(data)
      })
      return
    }
    public.sendFile(extname, (type) => {
      res.writeHead(200, {'Content-type': type})
      res.end(data)
    })
  })
})

module.exports = web
