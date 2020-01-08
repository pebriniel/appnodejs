const Controller = require('../controller.js');
const uniqid = require('uniqid');

class ConnexionController extends Controller{

    exec(req, res) {

        this._req = req;
        this._res = res;

        var username = (req.body.username) ? req.body.username : '';
        var password = (req.body.password) ? req.body.password : '';

        var cookie = (this._req.cookies['userSession']) ? this._req.cookies['userSession'] : 'empty';

        this.init();

        this.user.isConnected(cookie)
        .then((status) => {
            if(status){
                return this._res.redirect('/')
            }
            else if(username == '' && password == ''){
                this._res.render('utilisateurs/login.twig', {
                    connected: false
                })
            }
            else{
                this.user.checkLogin(username, password)
                .then((data) => {
                    if(data){

                        let _uniqid = uniqid();

                        this.user.setCookie(_uniqid);
                        this._res.cookie("userSession", _uniqid);

                        return this._res.redirect('/')
                    }

                    this._res.render('utilisateurs/login.twig', {
                        connected: data
                    })
                });
            }
        });
    }

}

module.exports = ConnexionController;
