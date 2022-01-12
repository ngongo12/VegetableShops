const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const notificationSchema = new Schema({
    id: { type: ObjectId },
    createdAt: { type: Date },
    title: { type: String },
    body: { type: String },
    image: { type: String },
    uid: { type: String },
    type: { type: String },
    linkID: { type: String },
    state: { type: String }
})

module.exports = mongoose.model('notification', notificationSchema);