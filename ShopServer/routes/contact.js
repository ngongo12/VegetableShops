var express = require('express');
const contactController = require('../controllers/contact');
var router = express.Router();

router.get('/getListById', async (req, res, next) => {
    const { id } = req.query;
    const contacts = await contactController.getListContact(id);

    res.json(contacts);
})

router.get('/getContactByID', async (req, res, next) => {
    const { id } = req.query;
    const contact = await contactController.getContactByID(id);
    res.json(contact);
})

router.post('/getContactIdByUserIDs', async (req, res, next) => {
    const { ids } = req.body;
    //console.log(ids)
    const contact = await contactController.getContactIdByUserIDs(ids);
    res.json(contact[0]);
})

router.post('/create', async (req, res, next) => {
    const { contact } = req.body;
    console.log(contact)
    const result = await contactController.create(contact);

    res.json(result);
})

router.post('/update', async (req, res, next) => {
    const { id, contact } = req.body;
    const result = await contactController.updateContact( id , contact);

    res.json(result);
})

module.exports = router;