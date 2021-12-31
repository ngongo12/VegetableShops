const messageModel = require('../models/Message');

exports.getListMessage = async (id) => {
    return await messageModel.find(
        {
            contactId: id,
            $orderby: { createdAt: -1}
        }
    ).sort({ createdAt: -1}).limit(14);
}

exports.getLastMessage = async (id) => {
    return await messageModel.find(
        {
            contactId: id,
        }
    ).sort({ createdAt: -1}).limit(1);
}

exports.getMoreMessage = async (id, lastMessageID) => {
    return await messageModel.find(
        {
            contactId: id,
            _id: { $lt: lastMessageID }
        }
    )
    .sort({ createdAt: -1})
    //.skip({ _id: lastMessageID })
    .limit(5);
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