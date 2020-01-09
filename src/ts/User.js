const bcrypt = require("bcrypt");
const LibMysql = require("../mysql.js");

class User {

    constructor() {
        this._id = null;
        this._login = 'anonymous';
        this._status = 0;
    }

    isConnected(cookie){
        var mysqlConnexion = new LibMysql();

        return mysqlConnexion.start()
        //Nous sommes connectés, maintenant on check si l'utilisata
        .then((connection) => {
            let sql_template = "Select id, login, status, password from ?? where session = ? ";

            let replaces = ['utilisateurs', cookie];
            let sql = mysqlConnexion.mysql.format(sql_template, replaces);

            return mysqlConnexion.queryOne(connection, sql);

        })

    }

    checkUsername(username){
        var mysqlConnexion = new LibMysql();

        return mysqlConnexion.start()
        //Nous sommes connectés, maintenant on check si l'utilisata
        .then((connection) => {
            let sql_template = "Select id, login, status, password from ?? where login = ? ";

            let replaces = ['utilisateurs', username];
            let sql = mysqlConnexion.mysql.format(sql_template, replaces);

            return mysqlConnexion.queryOne(connection, sql);
        })
    }

    checkPassword(password, row){
        return bcrypt.compare(password, row.password).then((result) => {
            return row.status;
        });
    }

    setCookie(_uniqid) {

        var mysqlConnexion = new LibMysql();

        let mysql = LibMysql.mysql;
        let pool = LibMysql.pool;

        return mysqlConnexion.start()
        //Nous allons mettre à jour la session de l'utilisateur en BDD
        .then((connection) => {

            let sql_template = "update ?? set session = ? where id = ? ";

            let replaces = ['utilisateurs', _uniqid, this._id];
            let sql = mysqlConnexion.mysql.format(sql_template, replaces);

            return mysqlConnexion.upload(connection, sql);
        });
    }

    loadUser(data){
        this._id = data.id;
        this._login = data.login;
        this._status = data.status;
    }


    checkLogin(username, password){
        return this.checkUsername(username)
        .then((data) => {
            if(this.checkPassword(password, data)){
                this.loadUser(data);
                return true;
            }
            return false;
        })
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map
