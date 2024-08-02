const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config");

mongoose.connect(`${config.get("MONGODB_URL")}/scatch`)
.then(() => console.log("Connected to MongoDB..."))
.catch(err => console.error("Could not connect to MongoDB...", err)); 

module.exports = mongoose.connection;