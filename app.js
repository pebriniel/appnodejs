const Twig = require("twig");
const express = require('express');
const indexRoute = require('./src/routes/index.js');
const connexionRoute = require('./src/routes/connexion.js');

const app = express();

app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});

app.get('/', indexRoute);
app.get('/login', connexionRoute);

app.listen(8000);
