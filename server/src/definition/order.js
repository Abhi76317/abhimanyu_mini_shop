const db = require('@common/operation');
const model = require('@constant/model');
const models = require('@models');
const { RESPONSE } = require('@common/response');
const message = require('@constant/message');
const statusCode = require('@constant/statusCode');
const error = require('@common/err');

exports.orderProduct = async (body) => {
    const { user_id, order_attribute } = body;
    let price = 0;
    order_attribute.forEach((element) => {
        price = parseInt(element.product_price)
    });
    const id = Date.now()
    const result = await db.CREATE(model.ORDER, { id, user_id, price })
    return RESPONSE(true, result)
}

exports.orderAttribute = async (order_id, body) => {
    const { order_attribute } = body;

    if (order_attribute?.length < 1) {
        const err = error.ERROR(statusCode.UN_PROCESSABLE_ENTITY, message.ATTRIBUTE_REQUIRED);
        return err;
    }

    const arr = [];

    order_attribute.forEach((element, i) => {
        const id = Date.now() + i.toString()
        const obj = {
            id,
            order_id,
            product_id: element.product_id,
            Product_Size_id: element.Product_Size_id,
            Product_Color_id: element.Product_Color_id
        }
        arr.push(obj);
    });

    const result = await db.BULKCREATE(model.ORDER_ATTRIBUTE, arr);

    return RESPONSE(true, result)

}

exports.getOrder = async (user_id) => {
    const order = await db.FINDALL(model.ORDER, { user_id }, null, {
        model: models[model.ORDER_ATTRIBUTE],
        as: 'order_attribute',
    });

    return RESPONSE(true, order);
}
