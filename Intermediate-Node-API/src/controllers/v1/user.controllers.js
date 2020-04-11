const dotenv = require('dotenv');

const { info } = require('../../modules/log')
const { generateHash } = require('../../modules/encrypt');

const User = require('../../models/user.model');
const Product = require('../../models/product.model');

dotenv.config();

exports.createUser = async(req, res) => {
    try {

        info(`req.body: ${req.body}`)
        const { username, email, password, data } = req.body;
        const sizeSalt = Number(process.env.SIZE_SALT);
        const hash = await generateHash(password, sizeSalt);

        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hash;
        user.data = data;

        await user.save();

        res.send({ status: 'OK', message: 'User Created' });
    } catch (error) {
        if (error.code && error.code === 11000) {
            res
                .status(400)
                .send({ status: 'DUPLICATED_VALUES', message: error.keyValue });
            return;
        }
        res.status(500).send({ status: 'ERROR', message: error.message });
    }

};

exports.getUsers = (req, res) => {

};

exports.updateUser = (req, res) => {

};

exports.deleteUser = (req, res) => {

};