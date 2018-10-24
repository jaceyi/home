import * as formidable from 'formidable';
import {checkRequiredParams} from '../utils/utils';
import db from '../utils/db';

export function login(req, res) {
  res.json({
    username: req.body.username
  });
}

export function getStaticFileList(req, res) {
  checkRequiredParams(req.body, [], res,function() {
    const _sql: string = 'select * from static_file order by id desc';
    db.query(_sql, [], function (err, result) {
      if (err) {
        return res.status(500).json({
          msg: '服务器错误！',
          err
        })
      }
      res.json({
        data: result
      })
    })
  })
}

export function uploadStaticFile(req, res) {
  const form = new formidable.IncomingForm({
    uploadDir: 'files/',
    keepExtensions: true,
    maxFileSize: 1024 * 1024 * 20
  });
  form.parse(req, function (err, fields, files) {
    checkRequiredParams({
      ...fields,
      ...files
    }, ['title', 'file'], res, function() {
      const {
        title,
        description
      } = fields;
      const {
        path,
        type,
        name,
        size
      } = files.file;

      const _sql: string = 'insert into static_file (title, description, path, type, name, size) values (?, ?, ?, ?, ?, ?)';
      const _data: string[] = [title, description, path, type, name, size];

      db.query(_sql, _data, function(err, result) {
        if (err) {
          return res.status(500).json({
            msg: '服务器错误！',
            err
          })
        }
        res.json({
          msg: '上传成功',
          data: {
            id: result.insertId,
            path,
            title,
            description: description || '',
            type,
            name,
            size
          }
        });
      });
    });
  });
}
