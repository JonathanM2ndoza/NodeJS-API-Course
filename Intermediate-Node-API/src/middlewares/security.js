const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { info, error } = require('../modules/log')

dotenv.config();

exports.isValidHostaname = (req, res, next) => {
    const validHosts = process.env.VALID_HOSTS.split(',');
    if (validHosts.includes(req.hostname)) {
        next();
    } else {
        res.status(403).send({ status: 'ERROR', message: 'Access Denied' });
    }
};

exports.isAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            throw {
                code: 403,
                message: 'Missing header token'
            };
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.sessionData = { userId: data.userId, role: data.role };
        next();
    } catch (err) {
        error(err);
        res
            .status(err.code || 500)
            .send({ status: 'ERROR', message: err.message });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        const { role } = req.sessionData;
        if (role !== 'admin') {
            throw {
                code: 403,
                message: 'Invalid role'
            };
        }
        next();
    } catch (err) {
        error(err);
        res
            .status(err.code || 500)
            .send({ status: 'ERROR', message: err.message });
    }
};