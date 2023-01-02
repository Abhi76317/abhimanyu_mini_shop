const { addProduct, addProductColor, addProductSize, getProduct } = require('@definition/product');
const statusCode = require('@constant/statusCode');

exports.addProduct = async (req, res, next) => {
    try {
        const { body, file } = req;
        const result = await addProduct(body, file)
        if (!result.success) {
            throw result;
        }

        const product_size = await addProductSize(result.data.dataValues.id, body);

        if (!product_size.success) {
            throw product_size;
        }
        const arr = [];
        product_size.data.forEach(element => {
            arr.push(element.dataValues)
        });
        result.data.dataValues.product_size = arr

        const product_color = await addProductColor(result.data.dataValues.id, body);

        if (!product_color.success) {
            throw product_color;
        }

        const arr_color = [];
        product_color.data.forEach(element => {
            arr_color.push(element.dataValues)
        });
        result.data.dataValues.product_color = arr_color

        res.status(statusCode.CREATED).json(result);
    } catch (err) {
        next(err);
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const result = await getProduct()

        if (!result.success) {
            throw result;
        }
        res.status(statusCode.OK).json(result);

    } catch (err) {
        next(err);
    }
}