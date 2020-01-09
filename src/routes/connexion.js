const Controller = require('../controller.js');
const uniqid = require('uniqid');

class ConnexionController extends Controller{

    login(req, res) {

        this._req = req;
        this._res = res;

        var username = (req.body.username) ? req.body.username : '';
        var password = (req.body.password) ? req.body.password : '';

        this.init();

        this.isConnected()
        .then((status) => {
            if(status){
                return this._res.redirect('/')
            }
            else if(username == '' || password == ''){
                this.view.connected = false;
                this.view.input_empty = true;

                return this._res.render('utilisateurs/login.twig', this.view);
            }
            else{
                this.user.checkLogin(username, password)
                .then((data) => {
                    if(data){

                        let _uniqid = uniqid();

                        this.user.setCookie(_uniqid);
                        this._res.cookie("userSession", _uniqid);

                        return this._res.redirect('/');
                    }

                    this.view.connected = data;

                    return this._res.render('utilisateurs/login.twig', this.view);
                });
            }

        });
    }

    logout(req, res) {
        res.cookie("userSession", '');

        return res.redirect('/');
    }

}

module.exports = ConnexionController;
