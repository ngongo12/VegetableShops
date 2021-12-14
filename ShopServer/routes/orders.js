var express = require('express');
const orderController = require('../controllers/orders');
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

module.exports = router;