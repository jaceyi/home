module.exports = {
  sendFile,
  endJson
}

const fs = require('fs')

function sendFile (extname, cb) {
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
  res.writeHead(o.code, {'Content-type': 'application/json'})
  res.end(JSON.stringify(o))
}
