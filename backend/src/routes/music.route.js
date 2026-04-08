const express = require("express");
const router = express.Router();
const Music = require("../models/music.model");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const audioUpload = require("../service/imagekitUpload");

router.post("/newmusic", upload.single("audio"), async (req, res) => {
      const { title, artist } = req.body;
      const audio_file = req.file;
      if (!title || !artist || !audio_file) return res.status(400).json({ message: "Some input fields are empty" });
      const audioData = await audioUpload(audio_file);
      const music = new Music({ title, artist, audio_url: audioData.url });
      await music.save();
      res.status(201).json({ message: "Music added successfully" });
});
router.get("/get-music", async (req, res) => {
      const music = await Music.find();
      res.status(200).json(music);
});
module.exports = router;
