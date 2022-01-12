var express = require('express');
const notificationController = require('../controllers/notification');
var router = express.Router();

router.get('/', async (req, res, next) => {
    const { uid } = req.query;
    const notifications = await notificationController.getNotificationByUserID(uid);

    res.json(notifications);
})

router.get('/notSeenNotify', async (req, res, next) => {
    const { uid } = req.query;
    const notifications = await notificationController.getNotSeenNotificationByUserID(uid);

    res.json(notifications);
})

router.get('/seenNotification', async (req, res, next) => {
    const { notifyID } = req.query;
    const notifications = await notificationController.seenNotification(notifyID);

    res.json(notifications);
})

router.get('/seenAll', async (req, res, next) => {
    const { uid } = req.query;
    const notifications = await notificationController.seenAll(uid);

    res.json(notifications);
})

module.exports = router;