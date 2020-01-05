import bcrypt = require('bcrypt');
import LibMysql = require('../mysql.js');

export class User {
    private _login:string = 'anonymous';
    private _status:number = 0;
    private _password;

    isLogged(cookie, callback) {

        var _this = this;

        let mysql = LibMysql.mysql;
        let pool = LibMysql.pool;

        let sql_template = "Select login, password from ?? where session = ? ";

        let replaces = ['utilisateurs', cookie];
        let sql = mysql.format(sql_template, replaces);

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            connection.query(sql, function(err, rows, fields) {

                if(rows.length){
                    _this._login = rows[0].login;
                    _this._status = rows[0].status;
                }

                callback(_this._status);
            });

        });
    }

    CheckIdentifiant(username, password, callback) {
        let mysql = LibMysql.mysql;
        let pool = LibMysql.pool;

        let sql_template = "Select login, password from ?? where login = ? ";

        let replaces = ['utilisateurs', username];
        let sql = mysql.format(sql_template, replaces);

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            connection.query(sql, function(err, rows, fields) {
                connection.release();

                if(rows.length){
                    bcrypt.compare(password, rows[0].password, callback);
                }
                else{
                    callback(null, false);
                }


            });
        });
    }

    setCookie(saltCookie) {

    }

    setPassword(myPlaintextPassword: string) {
        this._password = myPlaintextPassword;
    }

    getSalt(callback, _passwword = '') {
        let saltRounds = 10;

        let password = (this._password) ? this._password : _passwword;

        bcrypt.genSalt(saltRounds, function(err, salt) {

            bcrypt.hash(password, salt, function(err, hash) {

                callback(hash);
            });
        });
    }

}
