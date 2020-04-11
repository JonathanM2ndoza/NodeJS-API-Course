const Product = require('../../models/product.model');

exports.createProduct = async(req, res) => {
    try {

        const product = new Product(req.body);
        return await product.save();

    } catch (error) {
        throw error;
    }
};

exports.getProducts = async(req, res) => {
    try {

        const products = await Product
            .find( /*{ price: { $gt: 2.000 } }*/ )
            .select('title desc price')
            .populate('user', 'username email data role');

        return products;

    } catch (error) {
        throw error;
    }
};

exports.getProductsByUser = async(req, res) => {
    try {

        const products = await Product.find({
            user: req.params.userId
        });

        return products;

    } catch (error) {
        throw error;
    }
};

exports.deleteProduct = async(req, res) => {
    try {

        const products = await Product.findByIdAndDelete(req.params.productId);
        return products;

    } catch (error) {
        throw error;
    }
};