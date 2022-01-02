const admin = require("../helper/firebase_admin");
const notificationModel = require("../models/NotificationModel");

exports.sendMessage = async (tokens, notification, data) => {
    //console.log('notification service');
   // console.log(data)
    return await admin.admin.messaging().sendMulticast({
        tokens,
        notification,
        data
    })
        .catch(e => console.error(e));
}

exports.createNotification = async (notification) => {
    const item = new notificationModel({
        ...notification,
        createdAt: new Date()
    });
    return await item.save();
}

exports.getNotificationByUserID = async (uid) => {
    return await notificationModel.find({ uid }).sort({ createdAt: -1 });
}