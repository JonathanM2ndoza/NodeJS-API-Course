const User = require('../../models/user.model');

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