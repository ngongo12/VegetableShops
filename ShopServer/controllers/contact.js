const contactService = require('../services/contact');

exports.getListContact = async (id) => {
    return await contactService.getListContact(id);
}

exports.create = async (contact) => {
    return await contactService.create(contact);
}

exports.updateContact = async (id, contact) => {
    return await contactService.updateContact(id, contact);
}

exports.getContactIdByUserIDs = async (ids) => {
    return await contactService.getContactIdByUserIDs(ids);
}

exports.getContactByID = async (id) => {
    return await contactService.getContactByID(id);
}