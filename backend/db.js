require('dotenv').config(); // Load .env variables

const mongoose = require("mongoose");

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI,{})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

module.exports = mongoose;
