const error = require('@common/err');
const status = require('@constant/statusCode');
const message = require('@constant/message');

module.exports = (email) => {
  const pattern = /^[a-zA-Z0-9._]{3,}@[a-zA-Z]{2,}.{1}[a-zA-Z.]{2,6}$/;
  if (pattern.test(email)) {
    return { valid: true, err: null };
  }

  const err = error.ERROR(status.UN_PROCESSABLE_ENTITY, message.EMAIL_NOT_VALID);
  return { valid: false, err };
};
