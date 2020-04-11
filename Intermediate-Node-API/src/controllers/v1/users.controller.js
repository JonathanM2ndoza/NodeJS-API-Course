const dotenv = require('dotenv');

const { info } = require('../../modules/log')
const { generateHash } = require('../../modules/encrypt');

dotenv.config();

exports.createUser = async(req, res) => {
    try {

        const { username, email, password, data } = req.body;
        const sizeSalt = Number(process.env.SIZE_SALT);
        info(password);
        const hash = await generateHash(password, sizeSalt);


        res.send({ status: 'OK', message: 'user created' });
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