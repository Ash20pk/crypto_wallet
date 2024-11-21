const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  name: String,
  address: String,
  symbol: String,
  provider:String,
  connected_account : String
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
