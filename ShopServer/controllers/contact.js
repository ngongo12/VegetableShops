const contactService = require('../services/contact');

exports.getListContact = async (id) => {
    return await contactService.getListContact(id);
}

exports.createEmptyContact = async () => {
    return await contactService.createEmptyContact();
}

exports.updateContact = async (id, contact) => {
    return await contactService.updateContact(id, contact);
}

exports.getContactIdByUserIDs = async (ids) => {
    return await contactService.getContactIdByUserIDs(ids);
}