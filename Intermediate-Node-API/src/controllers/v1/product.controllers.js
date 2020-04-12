const { info, error } = require('../../modules/log')
const productService = require('../../services/v1/product.services')

exports.createProduct = async(req, res) => {
    try {
        const result = await productService.createProduct(req);
        info(result);

        res.send({ status: 'OK', message: result });
    } catch (err) {
        error(err);
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};

exports.getProducts = async(req, res) => {
    try {
        const products = await productService.getProducts();
        res.send({ status: 'OK', message: products });
    } catch (err) {
        error(err);
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};

exports.getProductsByUser = async(req, res) => {
    try {
        const products = await productService.getProductsByUser(req);
        res.send({ status: 'OK', message: products.length === 0 ? 'User not found' : products });
    } catch (err) {
        error(err);
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};

exports.deleteProduct = async(req, res) => {
    try {
        const products = await productService.deleteProduct(req);
        res.send({ status: 'OK', message: products === null ? 'Product not found' : products });
    } catch (err) {
        error(err);
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};