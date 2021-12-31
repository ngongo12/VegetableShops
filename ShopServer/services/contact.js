const contactModel = require('../models/Contact');

exports.getListContact = async (id) => {
    return await contactModel.find(
        {
            userIDs: { $in: [id] }
        }
    );
}

exports.getContactByID = async (id) => {
    return await contactModel.find(
        {
            _id: id
        }
    );
}

exports.create = async (contact) => {
    const item = new contactModel({
        ...contact,
        state: 'new',
        createdAt: new Date()
    });
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
            { userIDs: { $all: ids } }
        )
}