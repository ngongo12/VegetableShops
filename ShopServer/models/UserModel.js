const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    phone: { type: String },
    password: { type: String },
    salt: { type: String },
    fullname: { type: String },
    address: { type: Array },
    avatar: { type: String },
    createdAt: { type: Date },
})

module.exports = mongoose.model('user', userSchema);