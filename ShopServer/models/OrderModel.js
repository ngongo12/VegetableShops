const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    id: { type: ObjectId },
    payMethod: { type: Object },
    deliveryMothed: { type: Object },
    message: { type: String },
    distance: { type: Number },
    deliveryFee: { type: Number },
    totalPrice: { type: Number },
    products: { type: Array },
    state: { type: String }, // created, confirm, delivery, cancel, done, rated
    createdAt: { type: Date },
    confirmAt: { type: Date },
    deliveryAt: { type: Date },
    cancelAt: { type: Date },
    cancelBy: { type: ObjectId},
    doneAt: { type: Date },
    cancelReason: { type: String },
    shopID: { type: ObjectId },
    owner: { type: ObjectId },
})

module.exports = mongoose.model('order', orderSchema);