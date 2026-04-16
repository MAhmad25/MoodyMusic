const mongoose = require("mongoose");
const musicSchema = new mongoose.Schema({
      title: String,
      audio_url: String,
      mood: String,
});

const musicModel = mongoose.model("music", musicSchema);
module.exports = musicModel;
