const libUser = require('./ts/User');

class Controller{

    init(){
        this.user = new libUser.User();
    }

    failureCallback(erreur) {
      console.error("L'opération a échoué avec le message : " + erreur);
    }

    userConnected(){

        var cookie = (this._req.cookies['userSession']) ? this._req.cookies['userSession'] : 'empty';

        return this.user.isLogged(cookie);
    }
}

module.exports = Controller;
