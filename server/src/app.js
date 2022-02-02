const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./db/mongoose");
const userRouter = require("./routes/user.routes");
// const chatRouter = require("./routes/chat.routes");

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.use(express.static(path.join(__dirname, "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });
module.exports = app;
