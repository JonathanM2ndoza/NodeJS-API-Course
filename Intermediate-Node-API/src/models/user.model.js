const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: {
            age: Number,
            isMale: Boolean
        }
    },
    role: {
        type: String,
        enum: ['admin', 'seller'],
        default: 'seller'
    }
});

module.exports = mongoose.model("User", User);