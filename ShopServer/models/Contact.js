const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const contactSchema = new Schema({
    id: { type: ObjectId },
    userIDs: { type: Array },
    createdAt: { type: Date },
    state: { type: String }, //state: block, contact
})

module.exports = mongoose.model('contact', contactSchema);