var express = require('express');
const orderController = require('../controllers/orders');
const notificationController = require('../controllers/notification');
var router = express.Router();

router.post('/createOrder', async (req, res, next) =>{
    const { order } = req.body;
    const result = await orderController.createOrder(order);
    res.json({
        result
    })
});

router.get('/getOrderByID', async (req, res, next) =>{
    const { id } = req.query;
    const result = await orderController.getOrderByID(id);
    res.json({
        result
    })
});

router.post('/confirmOrder', async (req, res, next) =>{
    const { uid, orderID } = req.body;
    const result = await orderController.confirmOrder(uid, orderID);
    res.json({
        result
    })
});

router.post('/deliveryOrder', async (req, res, next) =>{
    const { uid, orderID } = req.body;
    const result = await orderController.deliveryOrder(uid, orderID);
    res.json({
        result
    })
});

router.post('/cancelOrder', async (req, res, next) =>{
    const { uid, orderID, message } = req.body;
    const result = await orderController.cancelOrder(uid, orderID, message);
    res.json({
        result
    })
});

router.post('/doneOrder', async (req, res, next) =>{
    const { uid, orderID } = req.body;
    const result = await orderController.doneOrder(uid, orderID);
    res.json({
        result
    })
});

router.get('/getShopOrderByState', async (req, res, next) =>{
    const { uid, state } = req.query;
    const result = await orderController.getShopOrderByState(uid, state);
    res.json({
        result
    })
});

router.get('/getMyOrderByState', async (req, res, next) =>{
    const { uid, state } = req.query;
    const result = await orderController.getMyOrderByState(uid, state);
    res.json({
        result
    })
});

router.post('/sendNotification', async (req, res, next) =>{
    const { uid, notification } = req.body;
    //console.log(tokens);
    //console.log('>>>>>>>>>>>>>>>uid ',uid);
    //const result = await orderController.sendMessage(tokens, notification, data);
    const result = await notificationController.sendNotification(notification, uid);
    res.json({
        result
    })
});

router.get('/statistic', async (req, res, next) =>{
    const { uid, time } = req.query;
    
    const arr = time.split('-');
    const firstDate = new Date(arr[0], arr[1]-1, 1);
    const lastDate = new Date(arr[0], arr[1], 1);

    const result = await orderController.statistic(uid, firstDate, lastDate);

    res.json({
        ...result,
        firstDate: firstDate.toString(),
        lastDate: lastDate.toString()
    })
});

module.exports = router;