const app = require("./app");
const http = require("http")
const cors = require("cors")
const server = http.createServer(app)
const io = require("socket.io")(server,{
  cors: {
    origin:"http://localhost:3000",
    methods: ["GET","POST"  ]
  }
})
require("dotenv").config();
const port = process.env.PORT;

//sockets
io.on("connection", (socket)=>{
  socket.emit("me", socket.id)
  console.log("connected");
  socket.on("disconnect", ()=>{
    socket.broadcast.emit("callEnded")
  })
  //call user
  socket.on("callUser", (data)=>{
    io.to(data.userToCall).emit("callUser", {signal:data.signalData, from: data.from, name:data.name})
  })
  //answer call
  socket.on("answerCall", (data)=>{
    io.to(data.to).emit("callAccepted", data.signal)
  })
})



server.listen(port, () => {
  console.log("Server is up on port " + port);
});
