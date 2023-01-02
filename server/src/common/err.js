const statusRes = require('@constant/statusCode'); 
const messageRes = require('@constant/message');

exports.ERROR = (statusCode, receivedMessage) => {
  const code = statusCode || statusRes.INTERNAL_SERVER_ERROR;
  const msg = receivedMessage || messageRes.INTERNAL_SERVER_ERROR;
  const err = new Error();
  err.message = msg;
  err.statusCode = code;
  return err;
};
