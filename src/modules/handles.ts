import * as formidable from 'formidable';
import {checkRequiredParams, sendServerErrorInfo} from '../utils/utils';
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
        return sendServerErrorInfo(res, err)
      }
      res.json({
        data: result
      })
    })
  })
}

export function addStaticFile(req, res) {
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
        type,
        name,
        size
      } = files.file;
      const path: string = `/${files.file.path}`;
      const _sql: string = 'insert into static_file (title, description, path, type, name, size) values (?, ?, ?, ?, ?, ?)';
      const _data: string[] = [title, description, path, type, name, size];

      db.query(_sql, _data, function(err, result) {
        if (err) {
          return sendServerErrorInfo(res, err)
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

export function updateStaticFile(req, res) {
  const form = new formidable.IncomingForm({
    uploadDir: 'files/',
    keepExtensions: true,
    maxFileSize: 1024 * 1024 * 20
  });
  form.parse(req, function (err, fields, files) {
    checkRequiredParams({
      ...fields,
      ...files
    }, ['id', 'file', 'title'], res, function() {
      const {
        id,
        title,
        description
      } = fields;
      const file = (files.file && {
        ...files.file,
        path: `/${files.file.path}`
      }) || JSON.parse(fields.file);
      const {
        path,
        type,
        name,
        size
      } = file;

      const _sql: string = 'update static_file set title = ?, description = ?, path = ?, type = ?, name = ?, size = ? where id = ?';
      const _data: string[] = [title, description, path, type, name, size, id];
      db.query(_sql, _data, function(err) {
        if (err) {
          return sendServerErrorInfo(res, err)
        }
        res.json({
          msg: '更新成功',
          data: {
            id,
            path,
            title,
            description: description || '',
            type,
            name,
            size
          }
        });
      });
    })
  })
}

export function deleteStaticFile(req, res) {
  checkRequiredParams(req.body, ['id'], res,function () {
    const _sql: string = 'delete from static_file where id = ?';
    const _data: string[] = [req.body.id];
    db.query(_sql, _data, function(err) {
      if (err) {
        return sendServerErrorInfo(res, err)
      }
      res.json({
        msg: '删除成功'
      })
    })
  })
}
