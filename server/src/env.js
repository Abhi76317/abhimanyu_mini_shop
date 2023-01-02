const secret = require('@constant/secret');

module.exports = process.env.NODE_ENV ? secret[process.env.NODE_ENV] : secret.development;
