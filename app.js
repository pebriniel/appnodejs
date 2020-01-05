const Twig = require("twig");
const express = require('express');
const indexRoute = require('./src/routes/index.js');
const connexionRoute = require('./src/routes/connexion.js');
const cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");

const app = express();

app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(__dirname + '/public'));

app.get('/', indexRoute);

app.get('/login', connexionRoute);
app.all('/login', connexionRoute);

app.listen(8000);
