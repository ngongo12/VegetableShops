const messageModel = require('../models/Message');

exports.getListMessage = async (id) => {
    return await messageModel.find(
        {
            contactId: id,
            $orderby: { createdAt: -1}
        }
    ).sort({ createdAt: -1}).limit(5);
}

exports.getLastMessage = async (id) => {
    return await messageModel.find(
        {
            contactId: id,
        }
    ).sort({ createdAt: -1}).limit(1);
}

exports.createMessage = async (message) => {
    //console.log(message)
    const item = new messageModel({
        ...message,
        createdAt: new Date(),
    });
    //console.log(item)
    return await item.save();
}