const bcrypt = require("bcrypt");
const LibMysql = require("../mysql.js");

class Commande {

    constructor() {

    }

    getCommande(idutilisateur){
        var mysqlConnexion = new LibMysql();

        return mysqlConnexion.start()
        //Nous sommes connectés, maintenant on check si l'utilisata
        .then((connection) => {
            let sql_template = "Select id, utilisateur, dateCreation, dateCloture from commandes where utilisateur = ? ";

            let replaces = [idutilisateur];

            let sql = mysqlConnexion.mysql.format(sql_template, replaces);

            return mysqlConnexion.queryOne(connection, sql);

        })

    }

}
module.exports = Commande;
