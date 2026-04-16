const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("./config/db")();
const musicRoutes = require("./routes/music.route");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
      res.send({ system: "healthy" });
});
app.use("/v1/music", musicRoutes);
module.exports = app;
