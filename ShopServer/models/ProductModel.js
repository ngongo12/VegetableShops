const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    categoryId: { type: ObjectId },
    owner: { type: ObjectId },
    brand: { type: String },
    images: { type: Array },
    origin: { type: String },
    unit: { type: String },
    description: { type: String },
    amount: { type: Number },
    sold: { type: Number },
    sellPrice: { type: Number },
    originPrice: { type: Number },
    createdAt: { type: Date },
    lastUpdate: { type: Date },
    nOSeen: { type: Number },
})

module.exports = mongoose.model('products', productSchema);