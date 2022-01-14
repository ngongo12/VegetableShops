const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const rateSchema = new Schema({
    id: { type: ObjectId },
    userID: { type: ObjectId },
    productID: { type: ObjectId },
    orderID: { type: ObjectId },
    createdAt: { type: Date },
    updatedAt: { type: Date},
    rate: { type: Number },
    message: { type: String }
})

module.exports = mongoose.model('rate', rateSchema);