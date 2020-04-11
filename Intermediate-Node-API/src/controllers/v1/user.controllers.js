const dotenv = require('dotenv');

const { info } = require('../../modules/log')
const { generateHash } = require('../../modules/encrypt');
const userService = require('../../services/user.services')

dotenv.config();

exports.createUser = async(req, res) => {
    try {

        const password = req.body.password;
        const sizeSalt = Number(process.env.SIZE_SALT);
        const hash = await generateHash(password, sizeSalt);

        req.body.password = hash;

        const result = await userService.createUser(req);
        info(result);

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