const orderService = require('../services/orders');
const productService = require('../services/products');
const notificationService = require('../services/notification');
const userService = require('../services/users');

exports.sendNotification = async (notification, uid) => {
    //console.log('>>>>>>>>>>>>>>>uid controller', uid);
    const user = await userService.getUserToken(uid);
    if(!user?.allowNotify?.notification) return;
    //console.log('>>>>>>>>>>>>>>>user',user);
    if (user?.token) {
        const notifi =  await notificationService.createNotification(notification);
        const { title, body, image } = notification;
        const message = await notificationService.sendMessage(
            [user?.token],
            { title, body, image },
            { uid: uid?.toString() }
        )
        console.log('>>>>>>>>>>> message ', message);
    }
    else {
        console.error('Không lấy được token');
    }
}

exports.getNotificationByUserID = async (uid) => {
    return await notificationService.getNotificationByUserID(uid);
}

exports.getNotSeenNotificationByUserID = async (uid) => {
    return await notificationService.getNotSeenNotificationByUserID(uid);
}

exports.seenNotification = async (notifyID) => {
    return await notificationService.seenNotification(notifyID);
}

exports.seenAll = async (uid) => {
    return await notificationService.seenAll(uid);
}