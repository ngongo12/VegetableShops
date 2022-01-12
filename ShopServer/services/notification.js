const admin = require("../helper/firebase_admin");
const notificationModel = require("../models/NotificationModel");

exports.sendMessage = async (tokens, notification, data) => {
    //console.log('notification service');
   console.log(data)
   console.log(tokens)
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

exports.getNotSeenNotificationByUserID = async (uid) => {
    return await notificationModel.find({ uid, state: { $ne: 'seen' } }).sort({ createdAt: -1 });
}

exports.seenNotification = async (notifyID) => {
    return await notificationModel.updateOne({ _id: notifyID }, {
        state: 'seen'
    })
}

exports.seenAll = async (uid) => {
    return await notificationModel.updateMany({ uid, state: { $ne: 'seen' } }, {
        state: 'seen'
    })
}