const userModel = require('../models/UserModel');

exports.register = async ( user ) => {
    const item = new userModel(user);
    
    return await item.save();
};

exports.getUserByPhone = async ( phone ) => {
    return await userModel.findOne({ phone }, 'phone password salt');
}

exports.getProfile = async (id) => {
    return await userModel.findOne({_id: id}, '-password -salt');
}

exports.checkPhoneExist = async ( phone ) => {
    return await userModel.find({ phone }).count();
}

exports.editProfile = async ( user ) => {
    try{
        return await userModel.updateOne({_id: user._id}, {...user});
    }catch(e){
        console.log(e)
    }
};