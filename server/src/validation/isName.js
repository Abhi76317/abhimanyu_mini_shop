const error = require('@common/err');
const status = require('@constant/statusCode');
const message = require('@constant/message');

module.exports = (strr) => {
  const str = strr?.trim();

  if (str.length > 2) {
    return { valid: true, err: null };
  }
  const err = error.ERROR(status.UN_PROCESSABLE_ENTITY, message.WRONG_SEGMENT);
  return { valid: false, err };
};
