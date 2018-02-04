const express = require('express')
const web = express()
const fs = require('fs')
const path = require('path')
const publics = require('./public')
const fileUrl = './web/dist/'

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
    publics.sendFile(extname, (type) => {
      res.writeHead(200, {'Content-type': type})
      res.end(data)
    })
  })
})

module.exports = web
