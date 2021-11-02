var express = require('express');
const userController = require('../controllers/users');
var router = express.Router();

router.post('/register', async (req, res, next) => {
  const { user } = req.body;
  const userRep = await userController.register( user );

  res.json(userRep);
})

router.post('/login', async (req, res, next) => {
  const { user } = req.body;
  const userRep = await userController.login( user );

  res.json(userRep);
})

module.exports = router;
