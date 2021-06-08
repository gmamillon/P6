const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
    });
    sauce.save()
    .then(() => res.status(200).json({ message: "Sauce créée." }))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));  
};

exports.updateSauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée.'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req, res) => {
    const like = req.body.like;
    const userId = req.body.userId;
    Sauce.findOne({ _id: req.params.id }).exec(function (error, sauce){
        if (like == 1 && sauce.usersLiked.indexOf(userId) == -1) {
            sauce.likes++;
            sauce.usersLiked.push(userId);
        } else if (like == -1 && sauce.usersDisliked.indexOf(userId) == -1) {
            sauce.dislikes++;
            sauce.usersDisliked.push(userId);
        } else if (like == 0) {
            if (sauce.usersLiked.indexOf(userId) !== -1) {
                sauce.likes--;
                sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
            } else {
                sauce.dislikes--;
                sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
            }
        };
        sauce.save()
        .then(() => res.status(201).json({ message: "Votre avis sur la sauce a bien été pris en compte." }))
        .catch(error => res.status(400).json({ error }));
  });
};