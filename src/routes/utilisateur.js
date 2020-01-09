const Controller = require('../controller.js');
const ModelCommande = require('../ts/Commande');

class utilisateurController extends Controller{

    // Liste de toutes les commandes
    commandes(req, res) {

    }

    // Commande spécifique
    commande(req, res) {
        var commande = new ModelCommande();

        this._req = req;
        this._res = res;

        var id = req.params.id;

        this.init();

        this.isConnected()
        .then((user) => {
            if(!user || user.status == 0){

                return this._res.redirect('/login');

            }

            this.view.connected = user.status;
            this.view.user = user;

            return this.user.loadUser(id);
        })
        .then((data) => {

            // pourquoi data[0] (?) -- à revoir
            this.view.commandeUser = data;

            return commande.getCommande(data.id);
        })
        .then((data) => {

            this.view.commande = data;

            return this._res.render('utilisateur/commande.twig', this.view)

        })


    }
}

module.exports = utilisateurController;
