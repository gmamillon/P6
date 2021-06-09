module.exports = (req, res, next) => {
    const regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;
    const regexPassword = /^[a-zA-Z0-9-' éèàêûñçàôëù]+{8,}$/;
    if (regexEmail.test(req.body.email) && regexPassword.test(req.body.password)) {
        next();
    } else {
        res.status(400).json({ message: "L'adresse mail ou le mot de passe est invalide."});
    }
}