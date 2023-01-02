const { orderProduct, orderAttribute, getOrder } = require('@definition/order');
const statusCode = require('@constant/statusCode');
const { sendMail } = require('../common/sendMail')
const env = require('@env')
const Stripe = require('stripe');
const stripe = Stripe(env.STRIPE_SECRET);

exports.orderProduct = async (req, res, next) => {
    try {
        const { body } = req;
        body.user_id = req.user.id;
        const result = await orderProduct(body)
        if (!result.success) {
            throw result;
        }

        const order_id = result.data.dataValues.id

        const order_attribute = await orderAttribute(order_id, body)

        if (!order_attribute.success) {
            throw result;
        }

        result.data.dataValues.order_attribute = order_attribute;

        await sendMail(req.user, order_id)

        res.status(statusCode.CREATED).json(result);
    } catch (err) {
        next(err);
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const result = await getOrder(req.user.id)
        if (!result.success) {
            throw result;
        }
        res.status(statusCode.OK).json(result);
    } catch (err) {
        next(err);
    }
}

exports.makePayment = async (req, res, next) => {
    const { order_attribute } = req.body;
    const line_items = order_attribute.map((ele) => {
        return (
            {
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: ele.product_name,
                    },
                    unit_amount: parseInt(ele.product_price) * 100,
                },
                quantity: 1,
            }
        )
    })
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${env.CLINT_URL}/check-out-success`,
        cancel_url: `${env.CLINT_URL}/check-out-fail`,
    });
    res.status(statusCode.OK).json({ url: session.url });
}