const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: false },
    name: { type: String, required: false },
    manufacturer: { type: String, required: false },
    description: { type: String, required: false },
    mainPepper: { type: String, required: false },
    heat: { type: Number, required: false },
    imageUrl: { type: String, required: false}
});

module.exports = mongoose.model('Sauce', sauceSchema);