const LibMysql = require('../mysql.js');
const libUser = require('../ts/User');

module.exports = function(req, res) {

    const user = new libUser.User();

    user.isLogged('boussad', 'monjoliemotdepasse', function(errCompare, resCompare){

        if(resCompare){
            res.setHeader('Content-Type', 'text/plain');
            res.send('Vous êtes à l\'accueil');
        }
        else{
            res.setHeader('Content-Type', 'text/plain');
            res.send('Vous n\'êtes pas connecté');
        }

    });


};
