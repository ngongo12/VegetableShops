var express = require('express');
const notificationController = require('../controllers/notification');
var router = express.Router();

router.get('/', async (req, res, next) => {
    const { uid } = req.query;
    const notifications = await notificationController.getNotificationByUserID(uid);

    res.json(notifications);
})

module.exports = router;