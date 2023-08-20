const express = require('express');
const router = express.Router();
const { getContact, getContactById, createContact, deleteContact, updateContact } = require('../controller/contactContoller');
const validateToken = require('../middleware/validatorTokenHandler');

router.use(validateToken);

router.route('/').get(getContact).post(createContact);

router.route('/:id').get(getContactById).put(updateContact).delete(deleteContact);;

module.exports = router;