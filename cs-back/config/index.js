const { join } = require("path");
const env = require("dotenv");

env.config({ path: join(__dirname, "..", ".env") });

module.exports = {
  PORT: process.env.SERVER_PORT || 5000,
  SIGN: "SymbolAwid123698521",
  MONGO: {
    uri: `${process.env.MONGO_URL}/${process.env.MONGO_DB}`,
  },
};
