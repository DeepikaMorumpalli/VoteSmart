const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    voterId : {
        type: String,
        required: true,
        unique: true,
    },
    emailId:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    hasVoted: {
        type: Boolean,
        default: false,
    }
})

const UserModel = model('User', UserSchema);
module.exports = UserModel;