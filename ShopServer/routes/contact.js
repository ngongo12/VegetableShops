var express = require('express');
const contactController = require('../controllers/contact');
var router = express.Router();

router.get('/', async (req, res, next) => {
    const { id } = req.query;
    const contacts = await contactController.getListContact(id);

    res.json(contacts);
})

router.post('/getContactIdByUserIDs', async (req, res, next) => {
    const { ids } = req.body;
    const contact = await contactController.getContactIdByUserIDs(ids);

    res.json(contact);
})

router.get('/createEmpty', async (req, res, next) => {
    
    const contact = await contactController.createEmptyContact();

    res.json(contact);
})

router.post('/update', async (req, res, next) => {
    const { id, contact } = req.body;
    const result = await contactController.updateContact( id , contact);

    res.json(result);
})

module.exports = router;