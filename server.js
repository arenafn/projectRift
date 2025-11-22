const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const app = express();

let botStatus = "offline";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences
  ]
});

client.on("ready", () => {
  botStatus = client.user.presence?.status || "online";
  console.log("Status server is running");
});

client.on("presenceUpdate", () => {
  botStatus = client.user.presence?.status || botStatus;
});

app.get("/status", (req, res) => {
  res.json({ status: botStatus });
});

client.login("MTQzMjQwNDA2NTM0NTYwMTY2OQ.GBzH3q.F0FnvSzOUnLdfL4f9BMSr3ewCpNMPOZZwKNEV8");

app.listen(3000, () => console.log("API running on port 3000"));
