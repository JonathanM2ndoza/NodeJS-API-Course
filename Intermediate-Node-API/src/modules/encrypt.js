const bcrypt = require('bcrypt');

exports.generateHash = async(password, sizeSalt) => {
    try {
        const salt = await bcrypt.genSalt(sizeSalt);

        const hash = await bcrypt.hash(password, salt);

        return hash
    } catch (err) {
        throw err;
    }
};

exports.comparePassword = async(passwordReq, passwordDB) => {
    try {

        return await bcrypt.compare(passwordReq, passwordDB);

    } catch (err) {
        throw err;
    }
};