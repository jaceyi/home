import * as formidable from 'formidable';

export function login(req, res) {
  res.json({
    name: req.body.username
  });
}

export function uploadStaticFile(req, res) {
  const {
    title,
    remark
  } = req.body;

  if (title && req.files) {
    const form = new formidable.IncomingForm();
    form.uploadDir = 'files';
    form.keepExtensions = true;
    form.maxFileSize = 20 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
      console.log(err, fields, files)
    });
  } else {
    res.status(400).json({
      msg: '参数缺失！'
    })
  }
}
