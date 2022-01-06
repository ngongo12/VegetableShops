const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const requestPassowrdSchema = new Schema({
    id: { type: ObjectId },
    token: { type: String },
    createdAt: { type: Date },
})

module.exports = mongoose.model('requestPassowrd', requestPassowrdSchema);