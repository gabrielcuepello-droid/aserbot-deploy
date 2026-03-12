const MongoAdapter = require("./mongo");
const MockAdapter = require("./mock");

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

// If no MongoDB URI is configured, use the mock adapter for demo mode
const adapterDB = MONGO_DB_URI 
  ? new MongoAdapter({ dbUri: MONGO_DB_URI, dbName: MONGO_DB_NAME })
  : new MockAdapter();

module.exports = { adapterDB }; // Exports the database adapter
