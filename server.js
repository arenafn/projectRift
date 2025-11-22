// server.js
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const app = express();

// Variable to store bot status
let botStatus = "No status";

// Create a Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences
  ]
});

// When bot is ready
client.on("ready", () => {
  console.log(`${client.user.tag} is ready!`);
  botStatus = client.user.presence?.status || "No status";
});

// Update status when presence changes
client.on("presenceUpdate", (oldPresence, newPresence) => {
  if (newPresence.userId === client.user.id) {
    // If the bot has a custom activity (playing, streaming, etc.)
    const activity = newPresence.activities[0];
    if (activity && activity.state) {
      botStatus = activity.state;
    } else {
      botStatus = newPresence.status || "No status";
    }
  }
});

// API route to get the status
app.get("/status", (req, res) => {
  res.json({ status: botStatus });
});

// Login your bot
client.login("YOUR_BOT_TOKEN"); // <-- replace with your bot token

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
