const MongoAdapter = require("./mongo");
const MockAdapter = require("./mock");

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

// Si no hay URI de MongoDB, usamos el MockAdapter para el modo demo
const adapterDB = MONGO_DB_URI 
  ? new MongoAdapter({ dbUri: MONGO_DB_URI, dbName: MONGO_DB_NAME })
  : new MockAdapter();

module.exports = { adapterDB }; // Exporta el adaptador de base de datos
