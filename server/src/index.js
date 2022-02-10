const app = require("./app");
const socketIO = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const socketConfig = require("./socket.config");
const io = socketIO(server, socketConfig);
const { generateMessage } = require("./socket-utils/chat.socket");
const {
  addUser,
  removeUser,
  updateUser,
  getUser,
  getUsersInRoom,
} = require("./socket-utils/users.socket");

require("dotenv").config();
const port = process.env.PORT;

//sockets
io.on("connection", (socket) => {
  console.log("connected");
  socket.emit("me", socket.id);
  //test having a second player
  socket.on("join", (user) => {
    socket.join(user.room);
    console.log("joined", user.room, user);
    socket.broadcast.emit(
      "server-message",
      generateMessage("Admin", `${user.displayName} has joined`)
    );
    const users = addUser(user, socket.id);
    const usersInRoom = getUsersInRoom(user.room);
    // console.log("join-res", users, usersInRoom);
    console.log({ usersInRoom }, { users });
    io.emit("join", users);
    // io.to(user.room).emit("join", usersInRoom);
  });
  //global messages
  socket.on("sendGlobalMessage", (m, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "sendGlobalMessage",
      generateMessage(user.displayName, m)
    );
    callback();
  });
  //handlePlayermove
  socket.on("movePlayer", (user) => {
    // console.log("move", user);
    const users = updateUser(user, socket.id);
    const usersInRoom = getUsersInRoom(user.room);
    io.emit("movePlayer", users);
  });
  socket.on("disconnect", () => {
    const users = removeUser(socket.id);
    console.log("disconnected");
    if (users.length > 0) io.emit("userDisconnected", users);
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
