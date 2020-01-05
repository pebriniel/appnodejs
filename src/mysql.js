const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

module.exports.mysql = mysql;
module.exports.pool = mysql.createPool({
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
