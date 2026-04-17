const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
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

const limiter = rateLimit({
      windowMs: 60 * 1000,
      max: 60,
      message: { error: "Too many requests, try again later." },
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", limiter);

require("./config/db")();

const musicRoutes = require("./routes/music.route");
app.get("/", (_, res) => {
      res.send({ system: "healthy" });
});
app.use("/v1/music", musicRoutes);

module.exports = app;
