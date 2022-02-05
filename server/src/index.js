const app = require("./app");
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowHeaders: "*",
  },
});
require("dotenv").config();
const port = process.env.PORT;

//sockets
io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  //test having a second player
  socket.on("join", ({ position, displayName, isFacingForward, id }) => {
    console.log(position, displayName, id, isFacingForward);
    io.emit("join", { position, displayName, isFacingForward, id });
  });
  socket.on("movePlayer", ({ id, position }) => {
    socket.broadcast.emit("movePlayer", { id, position });
  });
  console.log("connected");
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  //call user
  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });
  //answer call
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(port, () => {
  console.log("Server is up on port " + port);
});
