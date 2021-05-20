const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('requeue');
    next();
});
app.use((req, res, next) => {
    res.json({message : 'votre requête a bien été reçue'});
    next();
});

module.exports = app;