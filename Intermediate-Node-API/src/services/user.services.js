const User = require('../models/user.model');
const Product = require('../models/product.model');

exports.createUser = async(req) => {
    try {

        const { username, email, password, data } = req.body;

        const user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.data = data;

        return await user.save();

    } catch (error) {
        throw error;
    }

};