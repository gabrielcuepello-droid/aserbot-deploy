const express = require("express");

class ServerAPI {
  constructor(adapterProvider, adapterDB) {
    this.app = express();
    this.adapterProvider = adapterProvider;
    this.adapterDB = adapterDB;
  }

  start() {
    const port = process.env.PORT || 3001;
    this.app.get("/", (req, res) => {
      res.send("Bot is running");
    });
    this.app.listen(port, () => {
      console.log(`HTTP Server running on port ${port}`);
    });
  }
}

module.exports = ServerAPI;
