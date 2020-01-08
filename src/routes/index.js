const Controller = require('../controller.js');

class IndexController extends Controller{

    exec(req, res) {

        this._req = req;
        this._res = res;

        var username = (req.body.username) ? req.body.username : null;
        var password = (req.body.password) ? req.body.password : null;

        var cookie = (this._req.cookies['userSession']) ? this._req.cookies['userSession'] : 'empty';

        this.init();

        this.user.isConnected(cookie)
        .then((status) => {
            if(!status){

                return this._res.redirect('/login');

            }

            this._res.render('index/index.twig', {
                connected: status
            })
        })

    }
}

module.exports = IndexController;
