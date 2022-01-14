var express = require('express');
const productController = require('../controllers/products');
const rateController = require('../controllers/rates');
const socketIo = require('socket.io');
const io = socketIo();
var router = express.Router();

io.on('updateSeenProduct', (res) => {
    console.log('updateSeenProduct' ,res);
})

router.get('/newEmpty', async (req, res, next) =>{
    const id = await productController.newEmpty();
    res.json(id)
});

router.get('/getById', async (req, res, next) =>{
    const { id } = req.query;
    const product = await productController.getById(id);
    const rate = await rateController.countRate(id);
    res.json({
        product,
        rate: rate[0]
    })
});

router.post('/update', async (req, res, next) =>{
    const { product } = req.body;
    const result = await productController.update(product);
    res.json({
        result
    })
});

router.get('/getWithLimit', async (req, res, next) =>{
    const { uid, startAt, num } = req.query;
    const products = await productController.getWithLimit(uid, startAt, num);
    res.json({
        products
    })
});

router.get('/getMyProductsWithLimit', async (req, res, next) =>{
    const { uid, startAt, num } = req.query;
    const products = await productController.getMyProductsWithLimit(uid, startAt, num);
    res.json({
        products
    })
});

router.get('/getAllShopProducts', async (req, res, next) =>{
    const { uid } = req.query;
    const products = await productController.getAllShopProducts(uid);
    res.json({
        products
    })
});

router.get('/getTopProductByCategory', async (req, res, next) =>{
    const { id, uid } = req.query;
    const products = await productController.getTopProductByCategory(id, uid);
    res.json({
        products
    })
});

router.get('/getMoreProductByCategory', async (req, res, next) =>{
    const { id, uid, startAt } = req.query;
    const products = await productController.getMoreProductByCategory(id, uid, startAt);
    res.json({
        products
    })
});

router.post('/getProductsInArray', async (req, res, next) =>{
    const { arr } = req.body;
    //console.log(arr)
    const products = await productController.getProductsInArray(arr);
    res.json({
        products
    })
});

router.get('/getSalesProducts', async (req, res, next) =>{
    const { uid } = req.query;
    const products = await productController.getSalesProducts(uid);
    res.json({
        products
    })
});
router.get('/search', async (req, res, next) =>{
    const { value } = req.query;
    const products = await productController.search(value);
    res.json({
        products
    })
});

router.get('/updateNOSeen', async (req, res, next) =>{
    //console.log('updateNOSeen')
    const { id } = req.query;
    //console.log('updateNOSeen ', id)
    return productController.updateNOSeen(id);
});

router.get('/getRateByOrderID', async (req, res, next) =>{
    //console.log('updateNOSeen')
    const { orderID } = req.query;
    //console.log('updateNOSeen ', id)
    const rates = await rateController.getRateByOrderID(orderID);
    
    res.json({
        rates
    })
});

router.post('/saveRate', async (req, res, next) =>{
    //console.log('updateNOSeen')
    const { userID, orderID, productID, rate, message } = req.body;
    
    const _rate = await rateController.saveRate(userID, orderID, productID, rate, message);
    
    res.json({
        rate: _rate
    })
});

router.post('/updateRate', async (req, res, next) =>{
    //console.log('updateNOSeen')
    const { id, rate, message } = req.body;
    const _rate = await rateController.update(id, rate, message);
    
    res.json({
        rate: _rate
    })
});

module.exports = router;