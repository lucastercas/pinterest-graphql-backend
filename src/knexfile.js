const path = require('path')
const pg = require('pg')
require('dotenv').config({
  path: '../.env'
})

pg.defaults.ssl = true;

let connection = process.env.DATABASE_URL

module.exports = {
  client: 'pg',
  connection
};

/*
module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, ".data/database.sqlite"),
  },
  useNullAsDefault: true
};
*/
