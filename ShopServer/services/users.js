const userModel = require('../models/UserModel');

exports.register = async ( user ) => {
    const item = new userModel(user);
    
    return await item.save();
};

exports.getUserByPhone = async ( phone ) => {
    return await userModel.findOne({ phone });
}

exports.checkPhoneExist = async ( phone ) => {
    return await userModel.find({ phone }).count();
}