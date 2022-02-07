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
const {
  addUser,
  removeUser,
  updateUser,
  getUser,
} = require("./socket-utils/users.socket");
require("dotenv").config();
const port = process.env.PORT;

//sockets
io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  //test having a second player
  socket.on("join", (user) => {
    console.log("join", user);
    const users = addUser(user);
    io.emit("join", users);
  });
  //global messages
  socket.on("sendGlobalMessage", (m, callback) => {
    const user = getUser(socket.id);
    io.emit("sendGlobalMessage", generateMessage(user.username, m));
    callback();
  });
  //handlePlayermove
  socket.on("movePlayer", (user) => {
    console.log("move", user);
    const users = updateUser(user);
    io.emit("movePlayer", users);
  });
  socket.on("disconnect", () => {
    const users = removeUser(socket.id);
    if (users) io.emit(users);
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
