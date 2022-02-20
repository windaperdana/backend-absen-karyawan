const mysql = require("mysql2");
require('dotenv').config();
const db_connection = mysql
  .createConnection({
    host: process.env.HOST_DB, // HOST NAME
    user: process.env.USER_DB, // USER NAME
    database: process.env.DATABASE_NAME_DB, // DATABASE NAME
    password: process.env.PASS_DB, // DATABASE PASSWORD
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;