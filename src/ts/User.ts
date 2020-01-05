import bcrypt = require('bcrypt');
import LibMysql = require('../mysql.js');

export class User {
    private _login:string = 'anonymous';
    private _status:number = 1;
    private _password;

    isLogged(callback) {
        let mysql = LibMysql.mysql;
        let pool = LibMysql.pool;

        let sql_template = "Select login, password from ?? where login = ? ";

        let replaces = ['utilisateurs', 'boussad'];
        let sql = mysql.format(sql_template, replaces);

        pool.getConnection(function(err, connection) {
            if (err) throw err;

            connection.query(sql, function(err, rows, fields) {
                connection.release();

                if (err) throw err;

                this.compare('monmotdepasse', rows[0].password, callback)


            });
        });
    }

    setPassword(myPlaintextPassword: string) {
        this._password = myPlaintextPassword;
    }

    getSalt(callback) {
        let saltRounds = 10;

        let password = this._password;

        bcrypt.genSalt(saltRounds, function(err, salt) {

            console.log(password);
            bcrypt.hash(password, salt, function(err, hash) {

                callback(hash);
            });
        });
    }

    compare(password, hash, callback) {

        bcrypt.compare(password, hash, callback);

    }

}

console.log(new User().isLogged);
