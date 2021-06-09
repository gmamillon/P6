module.exports = (req, res, next) => {
    const regexId = /^[a-z0-9]+$/;
    const sauce = { ...req.body };
    if (regexId.test(sauce.userId)) {
        next();
    } else {
        res.status(400).json({ message: "Impossible de liker ou disliker la sauce."})
    }
}