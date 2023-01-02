const { userRegister, userLogin } = require('@definition/auth');
const statusCode = require('@constant/statusCode');
const message = require('@constant/message');

exports.userRegister = async (req, res, next) => {
    try {
        const { body } = req;
        const result = await userRegister(body)
        if (!result.success) {
            throw result;
        }

        res.status(statusCode.CREATED).json(result);
    } catch (err) {
        next(err);
    }
}

exports.userLogin = async (req, res, next) => {
    try {
        const { body } = req;
        const result = await userLogin(body)
        if (!result?.success) {
            throw result;
        }

        res.status(statusCode.OK).json(result);
    } catch (err) {
        next(err);
    }
}