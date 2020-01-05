const LibMysql = require('../mysql.js');
const libUser = require('../ts/User');

module.exports = function(req, res) {

    const user = new libUser.User();

    user.isLogged('boussad', 'monjoliemotdepasse', function(errConnexion, resConnexion){

        res.render('index/index.twig', {
            connected: resConnexion
        })

    });

};
