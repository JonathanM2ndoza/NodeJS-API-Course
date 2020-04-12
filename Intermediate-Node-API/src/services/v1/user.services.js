const User = require('../../models/user.model');
const Product = require('../../models/product.model');

exports.createUser = async(req, res) => {
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

exports.updateUser = async(req, res) => {
    try {

        const { username, email, data } = req.body;
        return await User.findByIdAndUpdate(req.params.userId, {
            username,
            email,
            data
        });

    } catch (error) {
        throw error;
    }
};

exports.getUser = async(req, res) => {
    try {

        return await User.findById(req.params.userId);

    } catch (error) {
        throw error;
    }
};

exports.getUsers = async(req, res) => {
    try {

        return await User.find().select({ password: 0, __v: 0, role: 0 });;

    } catch (error) {
        throw error;
    }
};

exports.deleteUser = async(req, res) => {
    try {

        await User.findByIdAndDelete(req.params.userId);
        await Product.deleteMany({ user: req.params.userId });

    } catch (error) {
        throw error;
    }
};