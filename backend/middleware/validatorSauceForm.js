//Validation des entrées du formulaire d'ajout/modification des sauces.
module.exports = (req, res, next) => {
    const regexId = /^[a-z0-9]+$/;
    const regexText = /^[a-zA-Z0-9-' éèàêûñçàôëù\n]+$/;
    const sauce = { ...req.body };
    if (regexId.test(sauce.userId) && regexText.test(sauce.name) && regexText.test(sauce.manufacturer) && regexText.test(sauce.description) && regexText.test(sauce.mainPepper)) {
        next();
    } else {
        res.status(400).json({ message: "L'un des champs du formulaire n'est pas valide !"})
    }
}