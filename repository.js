const MongoClient = require('mongodb').MongoClient;
const config = require("./config.js");

const db = new MongoClient(config.dbConnectionString);

module.exports = db;