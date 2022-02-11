import socketio from "socket.io-client";
import Peer from "simple-peer";
let socket;

export const initSocketListeners = (player, setPlayers, setMessages) => {
  socket = socketio.connect("127.0.0.1:3001");
  socket.on("join", (players) => {
    if (players) {
      setPlayers(players);
    }
  });
  socket.on("server-message", (message) => console.log(message));
  socket.on("movePlayer", (players) => {
    setPlayers(players);
  });
  socket.on("getPM", ({ player, message }) => {
    console.log(message);
  });
  socket.on("sendGlobalMessage", (message) =>
    setMessages((prev) => [...prev, message])
  );
  socket.on("userDisconnected", (players) => {
    setPlayers(players);
  });

  socket.emit("join", player);
};
export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};
export const emitMovePlayer = (player) => {
  socket.emit("movePlayer", player);
};
export const sendMessage = (player, message) => {
  socket.emit("sendGlobalMessage", { player, message });
};
export const sendPM = (player, recipient, message) => {
  socket.emit("sendPM", { player, recipient, message });
};

// VIDEO STUFF

//initiating permissions and setting own video stream
export const initMyStream = (setStream, myVideo) => {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });
};
//call user
// export    const callUser = (id, stream) => {
//        const peer = new Peer({
//          initiator: true,
//          trickle: false,
//          stream: stream,
//        });}
