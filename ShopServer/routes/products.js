var express = require('express');
const productController = require('../controllers/products');
var router = express.Router();

router.get('/newEmpty', async (req, res, next) =>{
    const id = await productController.newEmpty();
    res.json(id)
});

router.get('/getById', async (req, res, next) =>{
    const { id } = req.query;
    const product = await productController.getById(id)
    res.json({
        product
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
    const { uid } = req.query;
    const products = await productController.getWithLimit(uid, 1, 10);
    res.json({
        products
    })
});

router.get('/getMyProductsWithLimit', async (req, res, next) =>{
    const { uid } = req.query;
    const products = await productController.getMyProductsWithLimit(uid, 1, 10);
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

router.post('/getProductsInArray', async (req, res, next) =>{
    const { arr } = req.body;
    console.log(arr)
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
    console.log('updateNOSeen')
    const { id } = req.query;
    await productController.updateNOSeen(id);
});

module.exports = router;