const express = require("express");
const router = express.Router();
const Music = require("../models/music.model");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const audioUpload = require("../service/imagekitUpload");

router.post("/newmusic", upload.single("audio"), async (req, res) => {
      const { title, mood } = req.body;
      const audio_file = req.file;
      if (!title || !audio_file || !mood) return res.status(400).json({ message: "Some input fields are empty" });
      const audioData = await audioUpload(audio_file);
      const music = new Music({ title, audio_url: audioData.url, mood });
      await music.save();
      res.status(201).json({ message: "Music added successfully" });
});
router.get("/get-music", async (req, res) => {
      const { mood } = req.query;
      const music = await Music.find({ mood: mood });
      if (music.length == 0) return res.status(404).json({ success: false, message: "Music not found according to mood" });
      res.status(200).json({ success: true, data: music });
});
module.exports = router;
