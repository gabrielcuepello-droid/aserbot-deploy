const express = require("express");

class ServerAPI {
  constructor(adapterProvider, adapterDB) {
    this.app = express();
    this.adapterProvider = adapterProvider;
    this.adapterDB = adapterDB;
  }

  start() {
    this.app.get("/", (req, res) => {
      res.send("Bot is running");
    });

    const basePort = Number(process.env.PORT || 3001);
    this.listenWithFallback(basePort);
  }

  listenWithFallback(port) {
    const server = this.app.listen(port, () => {
      console.log(`HTTP Server running on port ${port}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.log(`Port ${port} is busy, trying ${port + 1}...`);
        this.listenWithFallback(port + 1);
        return;
      }

      throw error;
    });
  }
}

module.exports = ServerAPI;
