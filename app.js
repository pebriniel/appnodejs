const Twig = require("twig");
const express = require('express');
const cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");

const indexRoute = require('./src/routes/index.js');
const connexionRoute = require('./src/routes/connexion.js');
const utilisateurRoute = require('./src/routes/utilisateur.js');
const utilisateursRoute = require('./src/routes/utilisateurs.js');

const app = express();

app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    new indexRoute().exec(req, res);
});

// app.get('/login', function(req, res){
//     new connexionRoute().exec(req, res);
// });

app.all('/login', function(req, res){
    new connexionRoute().login(req, res);
});

app.get('/logout', function(req, res){
    new connexionRoute().logout(req, res);
});

app.get('/utilisateurs', function(req, res){
    new utilisateursRoute().liste(req, res);
});

app.get('/utilisateur/:id/commande', function(req, res){
    new utilisateurRoute().commande(req, res);
});

app.listen(8000);
