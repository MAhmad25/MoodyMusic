const mongoose = require("mongoose");
const { DB_URL } = require("./env.js");

const connect_DB = async () => {
      await mongoose.connect(DB_URL);
};
module.exports = connect_DB;
