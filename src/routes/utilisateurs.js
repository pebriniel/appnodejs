const Controller = require('../controller.js');

class utilisateursController extends Controller{

    // Liste de tous les utilisateurs
    liste(req, res) {

        this._req = req;
        this._res = res;

        this.init();

        this.isConnected()
        .then((user) => {
            if(!user || user.status == 0){

                return this._res.redirect('/login');

            }

            this.view.connected = user.status;
            this.view.user = user;

            return this.user.liste();
        })
        .then((data) => {

            this.view.liste = data;

            return this._res.render('utilisateurs/liste.twig', this.view)
        });


    }
}

module.exports = utilisateursController;
