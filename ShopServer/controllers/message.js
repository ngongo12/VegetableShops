const messageService = require('../services/message');

exports.getListMessage = async (id) => {
    return await messageService.getListMessage(id);
}

exports.getLastMessage = async (id) => {
    return await messageService.getLastMessage(id);
}

exports.getMoreMessage = async (id, lastMessageID) => {
    return await messageService.getMoreMessage(id, lastMessageID);
}

exports.createMessage = async (message) => {
    return await messageService.createMessage(message);
}
