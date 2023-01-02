const multer = require("multer");
const express = require('express');
const route = require('@constant/route');
const router = express.Router();
const uploader = require('@utils/image_uploader')
const { addProduct, getProduct } = require('@controler/product')

const upload = multer({
    storage: uploader.storage,
    fileFilter: uploader.fileFilter,
});

router.post(route.product.ADD_PRODUCT, upload.single('product_image'), addProduct)

router.get(route.product.GET_PRODUCT, getProduct)

module.exports = router;
