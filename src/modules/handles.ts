import * as formidable from 'formidable';
import {checkRequiredParams} from '../utils/utils';

const form = new formidable.IncomingForm({
  uploadDir: 'files/',
  keepExtensions: true,
  maxFileSize: 1024 * 1024 * 20
});

export function login(req, res) {
  res.json({
    username: req.body.username
  });
}

export function uploadStaticFile(req, res) {
  form.parse(req, function(err, fields, files) {
    checkRequiredParams(Object.assign(fields, files),['title', 'file'], res,function() {
      res.json({
        msg: '上传成功',
        filePath: files.file.path
      });
    });
  });
}
