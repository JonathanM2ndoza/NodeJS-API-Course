const bcrypt = require('bcrypt');

exports.generateHash = async(password, sizeSalt) => {
    try {
        const salt = await bcrypt.genSalt(sizeSalt);

        const hash = await bcrypt.hash(password, salt);

        return hash
    } catch (err) {
        throw new Error(err);
    }
};