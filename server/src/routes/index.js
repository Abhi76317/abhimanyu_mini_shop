const express = require('express');
const auth = require('./auth')
const product = require('./product');
const isAuth = require('@isAuth');
const order = require('./order');

const router = express.Router();

router.use(auth);

router.use(isAuth)

router.use(product);

router.use(order)

module.exports = router;
