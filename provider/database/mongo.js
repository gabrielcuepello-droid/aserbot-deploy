const { MongoClient } = require("mongodb"); // Imports the MongoDB client

class MongoAdapter {
  db; // Database handle
  listHistory = []; // Cached history entries
  credentials = { dbUri: null, dbName: null }; // Database credentials

  constructor(_credentials) {
    this.credentials = _credentials; // Stores the provided credentials
  }

  init = async () => {
    try {
      const client = new MongoClient(this.credentials.dbUri, {}); // Creates a MongoDB client
      await client.connect(); // Connects to the database
      console.log("Database connection established"); // Logs successful connection
      const db = client.db(this.credentials.dbName); // Selects the database
      this.db = db; // Stores the database handle
      return true; // Indicates a successful connection
    } catch (e) {
      console.log("Error", e); // Logs connection errors
      return; // Returns undefined when connection fails
    }
  };

  clearHistory = async (from) => {
    this.listHistory = []; // Clears the in-memory history cache
    await this.db.collection("history").deleteMany({ from }); // Deletes history documents for the number
  };

  getPrevByNumber = async (from) => {
    const result = await this.db
      .collection("history")
      .find({ from })
      .sort({ _id: -1 })
      .limit(1)
      .toArray(); // Gets the latest history record for the number
    return result[0]; // Returns the matching record
  };

  save = async (ctx) => {
    const ctxWithDate = {
      ...ctx,
      date: new Date(),
    }; // Adds the current date to the context
    await this.db.collection("history").insertOne(ctxWithDate); // Persists the context in history

    this.listHistory.push(ctx); // Adds the context to the in-memory history
  };

  createIntent = async (ctxIntents) => {
    await this.db.collection("intents").insertOne(ctxIntents); // Creates a new intent record
  };

  updateIntent = async (phone, status) => {
    await this.db
      .collection("intents")
      .findOneAndUpdate(
        { phone },
        { $set: { status } },
        { sort: { dateAt: -1 }, returnOriginal: false }
      ); // Updates the latest intent status for the phone number
  };

  sentimentCustomer = async (phone, sentiment) => {
    await this.db.collection("sentiments").findOneAndUpdate(
      { phone },
      { $set: { sentiment, date: new Date() } },
      {
        sort: { dateAt: -1 },
        upsert: true,
        returnOriginal: false,
      }
    ); // Updates or inserts the sentiment for the phone number
  };

  findIntent = async (phone) => {
    return await this.db
      .collection("intents")
      .findOne({ phone }, { sort: { dateAt: -1 } }); // Finds the most recent intent for the phone number
  };

  getAgents = async () => {
    return await this.db.collection("agents").find({}).toArray(); // Returns all configured agents
  };

  getLatestHistoyry = async (numLimit) => {
    const result = await this.db.collection("history").aggregate([
      {
        $group: {
          _id: "$from",
          historial: { $push: "$answer" },
        },
      },
      {
        $limit: numLimit,
      },
      {
        $project: {
          _id: 0,
          numero: "$_id",
          historial: { $slice: ["$historial", -10] },
        },
      },
    ]); // Aggregates the latest history entries for each number

    return result.toArray(); // Returns the aggregation result as an array
  };
}

module.exports = MongoAdapter; // Exports the MongoAdapter class
