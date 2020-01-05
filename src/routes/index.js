const LibMysql = require('../mysql.js');
const libUser = require('../ts/User');

module.exports = function(req, res) {

    const user = new libUser.User();

    var cookie = 'test1';

    user.isLogged(cookie, (status) => {

        res.render('index/index.twig', {
            connected: status
        })

    });

};
