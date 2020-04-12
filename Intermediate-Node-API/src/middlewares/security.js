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
            res
                .status(403)
                .send({ status: 'ERROR', message: 'Missing header token' });
            return;
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);
        info('jwt data', data);
        req.sessionData = { userId: data.userId, role: data.role };
        next();

    } catch (err) {
        error(err);
        res
            .status(500)
            .send({ status: 'ERROR', message: err.message });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        const { role } = req.sessionData;
        console.log('isAdmin', role);
        if (role !== 'admin') {
            throw {
                code: 403,
                status: 'ACCESS_DENIED',
                message: 'invalid role'
            };
        }
        next();
    } catch (e) {
        res
            .status(e.code || 500)
            .send({ status: e.status || 'ERROR', message: e.message });
    }
};