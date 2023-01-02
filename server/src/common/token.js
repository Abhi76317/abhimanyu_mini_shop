const jwt = require('jsonwebtoken');
const env = require('@env');

exports.generateToken = (data) => jwt.sign({
  data,
}, env.JWT_KEY, { expiresIn: '10h' });

exports.verifyToken = (token) => {
  let data = null;
  jwt.verify(token, env.JWT_KEY, (err, user) => {
    if (err) return;
    data = user.data;
  });
  return data;
};
