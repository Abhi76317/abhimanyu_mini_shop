const bcrypt = require('bcryptjs');
const db = require('@common/operation');
const model = require('@constant/model');
const models = require('@models');
const { RESPONSE } = require('@common/response');
const { generateToken } = require('@common/token');
const isName = require('@validation/isName');
const message = require('@constant/message');
const statusCode = require('@constant/statusCode');
const error = require('@common/err')

exports.addProduct = async (body, file) => {
    const { product_name, price } = body;
    const product_image = file.filename;

    const product_valid = isName(product_name)
    if (!product_valid.valid) {
        return product_valid.err;
    }

    const id = Date.now();

    const result = await db.CREATE(model.PRODUCT, {
        id,
        product_name,
        price,
        product_image
    });
    return RESPONSE(true, result);
};

exports.addProductSize = async (product_id, body) => {
    const { product_size } = body;

    const size = product_size.split(',')

    if (size.length < 1) {
        const err = error.ERROR(statusCode.UN_PROCESSABLE_ENTITY, message.ATTRIBUTE_REQUIRED);
        return err;
    }
    const arr = [];

    size.forEach(element => {
        const id = Date.now() + element;
        const obj = {
            id: id,
            product_id,
            size: element,
        }
        arr.push(obj);
    });

    const result = await db.BULKCREATE(model.PRODUCT_SIZE, arr);
    return RESPONSE(true, result);
};

exports.addProductColor = async (product_id, body) => {
    const { product_color } = body;
    const color = product_color.split(',')

    if (color.length < 1) {
        const err = error.ERROR(statusCode.UN_PROCESSABLE_ENTITY, message.ATTRIBUTE_REQUIRED);
        return err;
    }

    const arr = [];

    color.forEach(element => {
        const id = Date.now() + element;
        const obj = {
            id: id,
            product_id,
            color: element,
        }
        arr.push(obj);
    });


    const result = await db.BULKCREATE(model.PRODUCT_COLOR, arr);
    return RESPONSE(true, result);
};

exports.getProduct = async () => {
    const product = await db.FINDALL(model.PRODUCT, null, null, [
        {
            model: models[model.PRODUCT_SIZE],
            as: 'product_size',
            // attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
            model: models[model.PRODUCT_COLOR],
            as: 'product_color'
        }
    ],)
    return RESPONSE(true, product)
}