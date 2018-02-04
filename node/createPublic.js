module.exports = createPublic

const express = require('express')
const fs = require('fs')
const path = require('path')
const common = require('./common')

function createPublic (publicPath) {
  const app = express()
  app.use('/', function (req, res) {
    let pathname = req.url
    if (pathname === '/') {
      pathname = 'index.html'
    }
    const extname = path.extname(pathname)
    fs.readFile(publicPath + pathname, (err, data) => {
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
      common.sendFile(extname, (type) => {
        res.writeHead(200, {'Content-type': type})
        res.end(data)
      })
    })
  })
  return app
}
