const bcrypt = require('bcryptjs');
const db = require('@common/operation');
const model = require('@constant/model');
const { RESPONSE } = require('@common/response');
const { generateToken } = require('@common/token');
const isEmail = require('@validation/isEmail');
const isContact = require('@validation/isContact');
const isName = require('@validation/isName');
const message = require('@constant/message');
const statusCode = require('@constant/statusCode');
const error = require('@common/err')

exports.userRegister = async (body) => {
    const { firstName, lastName, email, contact, password } = body;

    const email_valid = isEmail(email);
    if (!email_valid.valid) {
        return email_valid.err;
    }

    const contact_valid = isContact(contact)
    if (!contact_valid.valid) {
        return contact_valid.err;
    }

    const firstName_valid = isName(firstName)
    if (!firstName_valid.valid) {
        return firstName_valid.err;
    }

    const lastName_valid = isName(lastName)
    if (!lastName_valid.valid) {
        return lastName_valid.err;
    }

    if (!password) {
        const err = error.ERROR(statusCode.UN_PROCESSABLE_ENTITY, message.WRONG_SEGMENT);
        return err;
    }

    const id = Date.now();

    const hashedPassword = password ? await bcrypt.hash(password, 12) : null;

    const result = await db.CREATE(model.USER, {
        id,
        firstName,
        lastName,
        email,
        contact,
        password: hashedPassword
    });
    return RESPONSE(true, result);
};

exports.userLogin = async (body) => {
    const { email, password } = body;
    
    let user = null;
    
    const isEmail = email.includes('@')

    if (isEmail) {
        user = await db.FINDONE(model.USER, { email });
    } else {
        user = await db.FINDONE(model.USER, { contact: email });
    }

    if (!user) {
        const err = error.ERROR(statusCode.UN_PROCESSABLE_ENTITY, message.NOT_REGISTERED);
        return err;
    }

    if (!password) {
        const err = error.ERROR(statusCode.UN_PROCESSABLE_ENTITY, message.WRONG_SEGMENT);
        return err;
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        const err = error.ERROR(statusCode.UN_PROCESSABLE_ENTITY, message.WRONG_PASSWORD);
        return err;
    }

    const token = generateToken(user);

    return ({
        success: true,
        token,
        user
    })
}
