const message = require('@constant/message');
const statusCode = require('@constant/statusCode');
const error = require('@common/err');
const authentication = require('@common/token');

const isAuth = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      const err = error.ERROR(statusCode.UN_AUTHORIZED, message.UN_AUTHOROZED);
      throw err;
    }

    const user = authentication.verifyToken(token);

    if (!user) {
      const err = error.ERROR(statusCode.UN_AUTHORIZED, message.UN_AUTHOROZED);
      throw err;
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
