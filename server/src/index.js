const app = require("./app");
const socketIO = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const socketConfig = require("./socket.config");
const io = socketIO(server, socketConfig);

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
  console.log("connected");
  socket.emit("me", socket.id);
  //test having a second player
  socket.on("join", (user) => {
    console.log("join", user);
    const users = addUser(user);
    console.log("join-res", users);
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
