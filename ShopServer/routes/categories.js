var express = require('express');
const categoryController = require('../controllers/categories');
var router = express.Router();

router.get('/', async (req, res, next) => {

    const categrories = await categoryController.getAll();

    res.json(categrories);
})

module.exports = router;