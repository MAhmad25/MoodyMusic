const express = require("express");
const app = express();
require("./config/db")();
const musicRoutes = require("./routes/music.route");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (_, res) => {
      res.send({ system: "healthy" });
});
app.use("/music", musicRoutes);
module.exports = app;
