var express = require('express');
const userController = require('../controllers/users');
var router = express.Router();

router.post('/register', async (req, res, next) => {
  const { user } = req.body;
  const userRep = await userController.register(user);

  res.json(userRep);
})

router.post('/login', async (req, res, next) => {
  const { user } = req.body;
  if (user) {
    const userRep = await userController.login(user);
    res.json(userRep);
  } else {
    res.json({
      message: 'Không có dữ liệu',
      result: false
    })

  }
})

router.post('/editProfile', async (req, res, next) => {
  const { user } = req.body;
  if (user) {
    const userRep = await userController.editProfile(user);
    res.json(userRep);
  }
  else {
    res.json({
      message: 'Không có dữ liệu',
      result: false
    })

  }
})

router.post('/changePassword', async (req, res, next) => {
  const { user } = req.body;
  if (user) {
    const userRep = await userController.changePassword(user);
    res.json(userRep);
  }
  else {
    res.json({
      message: 'Không có dữ liệu',
      result: false
    })

  }
})

router.get('/getShopName', async (req, res, next) => {
  const { id } = req.query;
  if (id) {
    const userRep = await userController.getShopName(id);
    res.json(userRep);
  }
  else {
    res.json({
      message: 'Không có dữ liệu',
      result: false
    })

  }
})

router.get('/getShopByID', async (req, res, next) => {
  const { id } = req.query;
  if (id) {
    const userRep = await userController.getShopByID(id);
    res.json(userRep);
  }
  else {
    res.json({
      message: 'Không có dữ liệu',
      result: false
    })

  }
})

router.get('/getUserByID', async (req, res, next) => {
  const { id } = req.query;
  if (id) {
    const userRep = await userController.getUserByID(id);
    res.json(userRep);
  }
  else {
    res.json({
      message: 'Không có dữ liệu',
      result: false
    })

  }
})

router.get('/getShopInfo', async (req, res, next) => {
  const { id } = req.query;
  if (id) {
    const userRep = await userController.getShopInfo(id);
    res.json(userRep);
  }
  else {
    res.json({
      message: 'Không có dữ liệu',
      result: false
    })

  }
})

router.get('/requestToken', async (req, res, next) => {
  const { phone } = req.query;
  const result = await userController.requestToken(phone);
  res.json(result)
})

router.get('/checkToken', async (req, res, next) => {
  const { phone, token } = req.query;
  const result = await userController.checkToken(phone, token);
  res.json(result)
})

router.get('/setNewPassword', async (req, res, next) => {
  const { uid, password } = req.query;
  const result = await userController.setNewPassword(uid, password);
  res.json(result)
})

module.exports = router;
