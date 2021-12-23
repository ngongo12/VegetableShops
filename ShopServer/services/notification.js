const admin = require("../helper/firebase_admin");

exports.sendMessage = async (tokens, notification) => {
    console.log('notification service');
    return await admin.admin.messaging().sendMulticast({
        tokens,
        notification
    })
    .catch(e => console.error(e));
}