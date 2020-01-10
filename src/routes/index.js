const Controller = require('../controller.js');

class IndexController extends Controller{

    exec(req, res) {

        this._req = req;
        this._res = res;

        this.init();

        this.isConnected()
        .then((user) => {
            if(!user || user.status == 0){

                return this._res.redirect('/login');

            }

            return this._res.render('index/index.twig', {
                connected: user.status,
                user: user
            })
        })

    }
}

module.exports = IndexController;
