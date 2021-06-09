const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const valSauceForm = require('../middleware/validatorSauceForm');
const valLike = require('../middleware/validatorLike');

router.post('/', auth, valSauceForm, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, valSauceForm, multer, sauceCtrl.updateSauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, valLike, sauceCtrl.likeSauce)

module.exports = router;