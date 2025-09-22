const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const header = req.headers['authorization'] || req.headers['Authorization'];
  if (!header) return res.status(401).json({ error: 'No token provided' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Invalid token format' });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = payload;
    next();
  });
};
