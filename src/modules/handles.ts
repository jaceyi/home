export function login(req, res) {
  res.json({
    username: req.body.username
  });
}

export function uploadStaticFile(req, res) {
  res.json({
    title: req.body.title
  });
}
