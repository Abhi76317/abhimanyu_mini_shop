require('dotenv').config();

module.exports = {
    development: {
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        PORT: process.env.PORT,
        JWT_KEY: process.env.JWT_KEY,
        STRIPE_SECRET: process.env.STRIPE_SECRET,
        CLINT_URL: process.env.CLINT_URL
    },
    production: {
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        PORT: process.env.PORT,
        JWT_KEY: process.env.JWT_KEY,
    },
};
