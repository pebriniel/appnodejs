const LibMysql = require('../mysql.js');
const libUser = require('../ts/User');

module.exports = function(req, res) {

    const user = new libUser.User();

    var username = (req.body.username) ? req.body.username : null;
    var password = (req.body.password) ? req.body.password : null;

    var cookie = 'test1';

    user.isLogged(cookie, (status) => {

        if(status == 0){
            user.CheckIdentifiant(username, password, function(errConnexion, resConnexion){

                res.render('utilisateurs/login.twig', {
                    connected: resConnexion
                })

            });

        }
        else{

            res.render('utilisateurs/login.twig', {
                connected: true
            })
        }

    });

};
