const secret = require('../constant/secret');
const env = process.env.NODE_ENV ? secret[process.env.NODE_ENV] : secret.development;

module.exports = {
  "development": {
    "username": env.DB_USER,
    "password": env.DB_PASS,
    "database": env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
