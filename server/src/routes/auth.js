const express = require('express');
const route = require('@constant/route');
const router = express.Router();
const { userRegister, userLogin } = require('@controler/auth');

router.post(route.authRoute.USER_REGISTER, userRegister)

router.post(route.authRoute.USER_LOGIN, userLogin)

module.exports = router;
