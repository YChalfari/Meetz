import socketio from "socket.io-client";
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
    console.log(players);
    setPlayers(players);
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
