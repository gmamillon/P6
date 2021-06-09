const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/user');
const validator = require('../middleware/validatorEmail');

router.post('/signup', validator, authCtrl.signup);
router.post('/login', validator, authCtrl.login);

module.exports = router;