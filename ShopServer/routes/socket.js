var express = require('express');
const socketAPI = require('../socketIO/socket_api');
var router = express.Router();

router.post('/', async (req, res, next) => {
    const { msg, token, sendTo } = req.body;
    socketAPI.sendMessage(token, msg, sendTo);
    res.json({ msg });
})

router.get('/view', async (req, res, next) => {
    res.render('socket')
})

module.exports = router;