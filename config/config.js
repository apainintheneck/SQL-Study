const fs = require("fs");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      bigNumberStrings: true
    }
};
