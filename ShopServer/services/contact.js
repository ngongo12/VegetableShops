const contactModel = require('../models/Contact');

exports.getListContact = async (id) => {
    return await contactModel.find(
        {
            userIDs: { $in: [id] }
        }
    );
}

exports.createEmptyContact = async () => {
    const item = new contactModel({ createdAt: new Date() });
    return await item.save();
}

exports.updateContact = async (id, contact) => {
    return await contactModel.updateOne(
        { _id: id },
        { ...contact }
    )
}

exports.getContactIdByUserIDs = async (ids) => {
    return await contactModel.find(
        {
            contactId: { $in: ids }
        }
    )
}