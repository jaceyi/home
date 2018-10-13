export function login(req, res) {
  res.json({
    name: req.body.username
  });
}
