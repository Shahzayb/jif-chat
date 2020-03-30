const jwt = require('jsonwebtoken');

exports.sign = data => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = jwt.sign(data, JWT_SECRET);
  return token;
};
