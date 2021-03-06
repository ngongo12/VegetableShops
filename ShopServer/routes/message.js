var express = require('express');
const messageController = require('../controllers/message');
var router = express.Router();

router.get('/', async (req, res, next) => {
    const { id } = req.query;
    const messages = await messageController.getListMessage(id);

    res.json(messages);
})

router.get('/lastMessage', async (req, res, next) => {
    const { id } = req.query;
    const messages = await messageController.getLastMessage(id);

    res.json(messages[0]);
})

router.get('/getMoreMessage', async (req, res, next) => {
    const { id, lastMessageID } = req.query;
    console.log('>>>>>>>>>>>>>>>' ,lastMessageID)
    const messages = await messageController.getMoreMessage(id, lastMessageID);

    res.json(messages);
})

router.post('/create', async (req, res, next) => {
    const { message } = req.body;
    const result = await messageController.createMessage(message);
    res.json(result);
})


module.exports = router;