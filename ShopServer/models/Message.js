const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
    id: { type: ObjectId },
    sendBy: { type: ObjectId },
    messageContent: { type: Object },
    createdAt: { type: Date },
    contactId: { type: ObjectId }
})

module.exports = mongoose.model('message', messageSchema);