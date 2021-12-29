const messageModel = require('../models/Message');

exports.getListMessage = async (id) => {
    return await messageModel.find(
        {
            contactId: id,
            $orderby: { createdAt: -1}
        }
    );
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