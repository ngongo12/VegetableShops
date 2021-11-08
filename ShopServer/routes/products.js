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


module.exports = router;