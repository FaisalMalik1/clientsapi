const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const clientSchema = new mongoose.Schema({ name: String });
const Client = mongoose.model("Client", clientSchema);

app.get("/clients", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

app.listen(port, () => {
  console.log(`🚀 API listening on port ${port}`);
});
