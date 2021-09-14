const MongoClient = require("mongodb").MongoClient;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not configured!");
}

const db = new MongoClient(process.env.MONGODB_URI);

module.exports = db;
