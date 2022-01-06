const userModel = require('../models/UserModel');
const requestPassword = require('../models/RequestPasswordModel');

exports.register = async (user) => {
    const item = new userModel(user);

    return await item.save();
};

exports.getUserByPhone = async (phone) => {
    return await userModel.findOne({ phone }, 'phone password salt');
}

exports.getProfile = async (id) => {
    return await userModel.findOne({ _id: id }, '-password -salt');
}

exports.checkPhoneExist = async (phone) => {
    return await userModel.find({ phone }).count();
}

exports.editProfile = async (user) => {
    try {
        return await userModel.updateOne({ _id: user._id }, { ...user });
    } catch (e) {
        console.log(e)
    }
};

exports.getShopName = async (id) => {
    return await userModel.findOne({ _id: id }, 'fullname shopName');
}

exports.getShopByID = async (id) => {
    return await userModel.findOne({ _id: id }, 'fullname shopName shopAddress');
}

exports.getUserByID = async (id) => {
    return await userModel.findOne({ _id: id }, 'fullname address phone');
}

exports.getUserToken = async (id) => {
    return await userModel.findOne({ _id: id }, 'token allowNotify');
}

exports.getShopInfo = async (id) => {
    return await userModel.findOne({ _id: id }, 'id shopName shopAddress phone avatar createdAt');
}

exports.saveToken = async (uid, token) => {
    if(!requestPassword.exists({_id: uid})){
        const item = new requestPassword({
            _id: uid,
            token,
            createdAt: new Date()
        })
        return await item.save();
    }else{
        console.log('update')
        await requestPassword.updateOne({_id: uid}, {
            token,
            createdAt: new Date()
        })
    }
}

exports.getToken = async (uid) => {
    return await requestPassword.findById(uid);
}