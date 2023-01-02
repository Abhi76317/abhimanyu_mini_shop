const express = require('express');
const route = require('@constant/route');
const router = express.Router();
const { orderProduct, getOrder, makePayment } = require('@controler/order')


router.post(route.order.ORDER_PRODUCT, orderProduct);

router.get(route.order.GET_ORDER, getOrder)

router.post(route.PAYMENT, makePayment)

module.exports = router;