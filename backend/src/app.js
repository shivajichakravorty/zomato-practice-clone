// Create Server

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
