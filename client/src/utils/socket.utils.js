import io from "socket.io-client";
export const socket = io.connect("127.0.0.1:3001");

export const initSocketListeners = (player, setPlayers) => {
  socket.on("join", (players) => {
    if (players) {
      setPlayers(players);
    }
  });
  socket.emit("join", player);
};
