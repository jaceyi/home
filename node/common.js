module.exports = {
  sendFile,
  endJson,
  formatDate
}

const fs = require('fs')

function sendFile (extname, cb) {
  // 静态文件加载
  fs.readFile('./node/type.json', function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    const typeJSON = JSON.parse(data)
    const type = typeJSON[extname] || 'text/plain'
    cb(type)
  })
}

function endJson (res, o) {
  // 返回json对象
  res.writeHead(o.code, {'Content-type': 'application/json'})
  res.end(JSON.stringify(o))
}

function formatDate (myDate, format) {
  // 格式化时间 format yyyy-MM-dd hh:mm:ss
  myDate = new Date(myDate)
  const o = {
    'M+': myDate.getMonth() + 1,
    'd+': myDate.getDate(),
    'h+': myDate.getHours(),
    'm+': myDate.getMinutes(),
    's+': myDate.getSeconds(),
    'q+': Math.floor((myDate.getMonth() + 3) / 3),
    'S': myDate.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (myDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}