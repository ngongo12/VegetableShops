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
    dob: { type: Date },
    lastUpdate: { type: Date },
    gender: { type: String },
    email: { type: String },
    favorites: { type: Array },
    seenProducts: { type: Array },
    shopName: { type: String },
    shopAddress: { type: Object },
    token: { type: String },
    allowNotify: { type: Object },
})

module.exports = mongoose.model('user', userSchema);