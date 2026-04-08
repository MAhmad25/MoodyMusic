const mongoose = require("mongoose");
const musicSchema = new mongoose.Schema({
      title: String,
      artist: String,
      audio_url: String,
});

const musicModel = mongoose.model("music", musicSchema);
module.exports = musicModel;
