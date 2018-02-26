const express = require('express')
const fs = require('fs')
const app = express()
const session = require('express-session')
const web = require('./node/web')
const admin = require('./node/admin')
const myPublic = require('./node/public')
const myFiles = require('./node/files')
const fm = require('formidable')
const db = require('./node/db')
const common = require('./node/common')

const FilesPath = './files/images/'

app.use(session({
  secret: '123456',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}))

app.post('/login', function (req, res) {
  const form = new fm.IncomingForm()
  form.parse(req, (err, fields) => {
    const {
      username,
      password
    } = fields
    if (!username || !password) {
      common.endJson(res, {
        code: 400,
        msg: '请求参数不完整'
      })
      return
    }
    const sql = 'select * from user where username = "' + username + '" and password = "' + password + '"'
    db.queryData(sql, (o) => {
      if (!o.err) {
        if (o.length) {
          const data = o[0]
          const user_id = data.id
          const user_level = data.level
          req.session.user_id = user_id
          req.session.user_level = user_level
          
          common.endJson(res, {
            code: 200,
            data: {
              id: user_id,
              level: user_level
            }
          })
        } else {
          common.endJson(res, {
            code: 400,
            msg: '账号或密码错误'
          })
        }
      }
    })
  })
})

app.get('/getLogin', function (req, res) {
  const user_id = req.session.user_id
  const user_level = req.session.user_level
  if (user_id) {
    common.endJson(res, {
      code: 200,
      data: {
        id: user_id,
        level: user_level
      }
    })
  } else {
    common.endJson(res, {
      code: 400,
      msg: '你还未登录'
    })
  }
})

app.get('/logout', function (req, res) {
  req.session.user_id = null
  req.session.user_level = null
  common.endJson(res, {
    code: 200,
    msg: '登出成功'
  })
})

app.get('/getWord', function (req, res) {
  const page = req.query.page
  if (!page) {
    common.endJson(res, {
      code: 400,
      msg: '请求参数不完整'
    })
    return
  }
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

app.delete('/delWord', function (req, res) {
  const id = req.query.id
  if (!id) {
    common.endJson(res, {
      code: 400,
      msg: '请求参数不完整'
    })
    return
  }
  const sql = 'delete from word where id=' + id
  db.deleteData(sql, (o) => {
    if (!o.err) {
      common.endJson(res, {
        code: 200,
        msg: '删除成功',
        data: o
      })
    }
  })
})

app.post('/editWord', function (req, res) {
  const form = new fm.IncomingForm()
  form.parse(req, (err, fields) => {
    const {
      name,
      img,
      content,
      time,
      id
    } = fields
    if (!name || !content) {
      common.endJson(res, {
        code: 400,
        msg: '请将内容填写完整'
      })
    }
    const sql = 'update word set name = ?, img = ?, content = ?, time = ? where id = ?'
    const data = [name, img, content, time, id]
    db.changeData(
      sql,
      data,
      (o) => {
        if (!o.err) {
          common.endJson(res, {
            code: 200,
            msg: '编辑成功',
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

// 获取个人信息
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

function getCommonData (req, res, id) {
  const sql = 'select * from common where id=' + id
  db.queryData(sql, (o) => {
    if (!o.err) {
      const body = JSON.parse(o[0].body)
      common.endJson(res, {
        code: 200,
        data: body
      })
    }
  })
}

function setCommonData (req, res, body, id) {
  const sql = 'update common set body = ? where id =' + id
  const data = [body]
  db.changeData(
    sql,
    data,
    (o) => {
      if (!o.err) {
        common.endJson(res, {
          code: 200,
          data: body,
          msg: '保存成功'
        })
      }
    }
  )
}

app.get('/getAbility', function (req, res) {
  getCommonData(req, res, 1)
})

app.post('/setAbility', function (req, res) {
  const form = new fm.IncomingForm()
  form.parse(req, (err, fields) => {
    const {
      abilityList
    } = fields
    if (!abilityList) {
      common.endJson(res, {
        code: 400,
        msg: '请将内容填写完整'
      })
    }
    setCommonData(req, res, JSON.stringify(abilityList), 1)
  })
})

app.get('/getWorks', function (req, res) {
  const page = req.query.page
  if (!page) {
    common.endJson(res, {
      code: 400,
      msg: '请求参数不完整'
    })
    return
  }
  const num = req.query.num || 10
  const sql = 'select * from works order by id desc limit ' + ((page - 1) * num) + ',' + num
  db.queryData(sql, (o) => {
    if (!o.err) {
      common.endJson(res, {
        code: 200,
        data: o
      })
    }
  })
})

app.post('/setWorks', function (req, res) {
  const form = new fm.IncomingForm()
  form.encoding = 'utf-8'
  form.maxFieldsSize = 1 * 1024 * 1024
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    const {
      name,
      type,
      startDate,
      endDate,
      link
    } = fields
    if (!name || !type || !startDate || !endDate) {
      common.endJson(res, {
        code: 400,
        msg: '请将内容填写完整'
      })
    }
    const imgFile = files.imgFile
    let imgSrc = ''
    if (imgFile) {
      if (imgFile.type !== 'image/jpeg' && imgFile.type !== 'image/png') {
        common.endJson(res, {
          code: 400,
          msg: '仅支持png/jpeg格式的图片'
        })
        return
      }
      fs.readFile(imgFile.path, function (err, data) {
        if (err) {
          common.endJson(res, {
            code: 400,
            msg: '图片加载失败，请重试'
          })
          return
        }
        const time = new Date().getTime()
        imgSrc = FilesPath + time + imgFile.name
        fs.writeFile(imgSrc, data, function (err, data) {
          if (err) {
            common.endJson(res, {
              code: 400,
              msg: '图片存储失败，请重试'
            })
          }
          queryDB()
        })
      })
    } else {
      queryDB()
    }
    function queryDB () {
      const sql = 'insert into works(id,type,name,startDate,endDate,link,imgSrc) values(0,?,?,?,?,?,?)'
      const sqlData = [type, name, startDate, endDate, link, imgSrc]
      db.addData(
        sql,
        sqlData,
        (o) => {
          if (!o.err) {
            common.endJson(res, {
              code: 200,
              msg: '保存成功',
              data: {
                id: o.insertId,
                name,
                type,
                startDate,
                endDate,
                link,
                imgSrc
              }
            })
          }
        })
    }
  })
})

app.post('/editWorks', function (req, res) {
  const form = new fm.IncomingForm()
  form.encoding = 'utf-8'
  form.maxFieldsSize = 1 * 1024 * 1024
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    const {
      name,
      type,
      startDate,
      endDate,
      link,
      id
    } = fields
    let imgSrc = fields.imgSrc || ''
    if (!name || !type || !startDate || !endDate ||　!id) {
      common.endJson(res, {
        code: 400,
        msg: '请将内容填写完整'
      })
    }
    const imgFile = files.imgFile
    if (imgFile) {
      if (imgFile.type !== 'image/jpeg' && imgFile.type !== 'image/png') {
        common.endJson(res, {
          code: 400,
          msg: '仅支持png/jpeg格式的图片'
        })
        return
      }
      fs.readFile(imgFile.path, function (err, data) {
        if (err) {
          common.endJson(res, {
            code: 400,
            msg: '图片加载失败，请重试'
          })
          return
        }
        const time = new Date().getTime()
        imgSrc = FilesPath + time + imgFile.name
        fs.writeFile(imgSrc, data, function (err, data) {
          if (err) {
            common.endJson(res, {
              code: 400,
              msg: '图片存储失败，请重试'
            })
          }
          queryDb()
        })
      })
    } else {
      queryDb()
    }
    function queryDb () {
      const sql = 'update works set type = ?, name = ?, startDate = ?, endDate = ?, link = ?, imgSrc = ? where id = ?'
      const sqlData = [type, name, startDate, endDate, link, imgSrc, id]
      db.changeData(
        sql,
        sqlData,
        (o) => {
          if (!o.err) {
            common.endJson(res, {
              code: 200,
              msg: '保存成功',
              data: {
                id,
                name,
                type,
                startDate,
                endDate,
                link,
                imgSrc
              }
            })
          }
        })
    }
  })
})

app.delete('/delWorks', function (req, res) {
  const id = req.query.id
  if (!id) {
    common.endJson(res, {
      code: 400,
      msg: '请求参数不完整'
    })
    return
  }
  const sql = 'delete from works where id=' + id
  db.deleteData(sql, (o) => {
    if (!o.err) {
      common.endJson(res, {
        code: 200,
        msg: '删除成功',
        data: o
      })
    }
  })
})

app.use('/public', myPublic)

app.use('/files', myFiles)

app.use('/admin', admin)

app.use('/', web)

app.listen(3000)
