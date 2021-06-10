const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Hachage du MDP et enregistrement du nouvel utilisateur dans la BDD.
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message : "Utilisateur créé."}))
        .catch(error => res.status(400).json({ error: "Adresse e-mail déjà attribuée" }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Vérification des identifiants de l'utilisateur lors de la connexion.
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé.'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: "Mot de passe incorrect."});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id},
                    'LA_VILLE_DE_SOTCHI_ETE_PEUPLE_DE_368011_HABITANTS_EN_2013',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};