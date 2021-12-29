const messageService = require('../services/message');

exports.getListMessage = async (id) => {
    return await messageService.getListMessage(id);
}

exports.createMessage = async (message) => {
    return await messageService.createMessage(message);
}
