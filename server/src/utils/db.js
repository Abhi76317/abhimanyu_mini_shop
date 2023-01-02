const { Sequelize } = require('sequelize');

const env = require('@env');

const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
    },
);

module.exports = sequelize;
