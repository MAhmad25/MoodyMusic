const express = require("express");
const app = express();
const cors = require("cors");
const { FRONTEND_URL } = require("./config/env");
const allowedOrigins = ["http://localhost:5173", String(FRONTEND_URL)];
const corsOptions = {
      origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                  callback(null, true);
            } else {
                  callback(null, true);
            }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
      optionsSuccessStatus: 200,
      allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
require("./config/db")();
const musicRoutes = require("./routes/music.route");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
      res.send({ system: "healthy" });
});
app.use("/v1/music", musicRoutes);
module.exports = app;
