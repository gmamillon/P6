<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/user');
const validator = require('../middleware/validatorEmail');

router.post('/signup', validator, authCtrl.signup);
router.post('/login', validator, authCtrl.login);
router.post('/delete', authCtrl.deleteUser);

=======
const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/user');
const validator = require('../middleware/validatorEmail');

router.post('/signup', validator, authCtrl.signup);
router.post('/login', validator, authCtrl.login);
router.post('/delete', authCtrl.deleteUser);

>>>>>>> cb9d2415423365b5ab1e962b26d85f6693ccd5a3
module.exports = router;