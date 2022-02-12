import socketio from "socket.io-client";
import Peer from "simple-peer";
import { playerProximity } from "./boundaries";

let socket;

export const initSocketListeners = (
  player,
  setPlayers,
  setMessages,
  setIsInCall,
  setCaller,
  setIsReceiving,
  setNearbyPlayers
) => {
  socket = socketio.connect(process.env.REACT_APP_SOCKET_URL || "/");
  socket.on("join", (players) => {
    if (players) {
      setNearbyPlayers(playerProximity(players, player));
      setPlayers(players);
    }
  });
  socket.on("server-message", (message) => console.log(message));
  socket.on("movePlayer", (players) => {
    setNearbyPlayers(playerProximity(players, player));
    setPlayers(players);
  });
  socket.on("getPM", (message) => {
    console.log(`${message.username} says ${message.text}`);
    setMessages((prev) => [...prev, message]);
  });
  socket.on("sendGlobalMessage", (message) =>
    setMessages((prev) => [...prev, message])
  );
  socket.on("userDisconnected", (players) => {
    setNearbyPlayers(playerProximity(players, player));
    setPlayers(players);
  });
  socket.on("callUser", (data) => {
    setIsReceiving(true);
    setCaller({ fromID: data.from, name: data.name, signal: data.signal });
  });

  socket.emit("join", player);
};
export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};
export const emitMovePlayer = (player) => {
  socket.emit("movePlayer", player);
};
export const sendMessage = (player, recipient, message) => {
  if (recipient === "global") {
    socket.emit("sendGlobalMessage", { player, message });
  } else {
    socket.emit("sendPM", { player, recipient, message });
  }
};
// export const sendPM = (player, recipient, message) => {
// };

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
// call user
export const callUser = (id, stream, partnerVideo) => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream: stream,
  });
  peer.on("signal", (data) => {
    socket.emit("signal", {
      userToCall: id,
      signalData: data,
      from: socket.id,
    });
  });
  peer.on("stream", (stream) => {
    if (partnerVideo.current) {
      partnerVideo.current.srcObject = stream;
    }
  });
  socket.on("callAccepted", (signal) => {
    //set state to accepted?
    peer.signal(signal);
  });
};
// Create peer
export const createPeer = () => {};
//Add peer
export const addPeer = () => {};
