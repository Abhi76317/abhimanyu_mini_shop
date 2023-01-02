const error = require('@common/err');
const status = require('@constant/statusCode');
const message = require('@constant/message');

module.exports = (contact) => {
    if (contact) {
        const phone = contact.trim();
        if (phone.length === 10) {
            return { valid: true, err: null };
        }
    }
    const err = error.ERROR(status.UN_PROCESSABLE_ENTITY, message.WRONG_SEGMENT);
    return { valid: false, err };
};
