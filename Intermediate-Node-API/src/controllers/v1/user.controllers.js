const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const { info, error } = require('../../modules/log')
const { generateHash, comparePassword } = require('../../modules/encrypt');
const userService = require('../../services/v1/user.services')

dotenv.config();

exports.createUser = async(req, res) => {
    try {

        const password = req.body.password;
        const sizeSalt = Number(process.env.SIZE_SALT);
        const hash = await generateHash(password, sizeSalt);

        req.body.password = hash;

        const result = await userService.createUser(req);
        info(result);
        const data = {
            userId: result._id,
            username: result.username,
            email: result.email,
            data: result.data
        }

        res.send({ status: 'OK', message: data });
    } catch (err) {
        error(err);
        if (err.code && err.code === 11000) {
            res
                .status(400)
                .send({ status: 'DUPLICATED_VALUES', message: err.keyValue });
            return;
        }
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};

exports.updateUser = async(req, res) => {
    try {
        const user = await userService.updateUser(req);
        info(user);
        res.send({ status: 'OK', message: user === null ? 'User not found' : 'User updated' });
    } catch (err) {
        error(err);
        if (err.code && err.code === 11000) {
            res
                .status(400)
                .send({ status: 'DUPLICATED_VALUES', message: err.keyValue });
            return;
        }
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};

exports.getUser = async(req, res) => {
    try {
        const user = await userService.getUser(req);
        res.send({ status: 'OK', message: user === null ? 'User not found' : user });
    } catch (err) {
        error(err);
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};

exports.getUsers = async(req, res) => {
    try {
        const users = await userService.getUsers();
        res.send({ status: 'OK', message: users.length === 0 ? 'Users not found' : users });
    } catch (err) {
        error(err);
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};

exports.deleteUser = async(req, res) => {
    try {
        await userService.deleteUser(req);
        res.send({ status: 'OK', message: 'User deleted' });
    } catch (err) {
        error(err);
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userService.getUserByOne({ email });
        if (!user) {
            return res.status(401).send({ status: 'ERROR', message: 'User not found' });
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(403).send({ status: 'ERROR', message: 'Invalid password' });
        }

        const tokenExpire = Number(process.env.JWT_EXPIRE_SECONDS);
        const token = jwt.sign({ userId: user._id, role: user.role },
            process.env.JWT_SECRET, { expiresIn: tokenExpire }
        );
        res.send({
            status: 'OK',
            message: {
                token,
                tokenExpire
            }
        });

    } catch (err) {
        error(err)
        res.status(500).send({ status: 'ERROR', message: err.message });
    }
};