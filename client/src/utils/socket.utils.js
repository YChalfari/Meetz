export const initSocketListeners = (player, setPlayers, socket) => {
  socket.on("join", (players) => {
    if (players) {
      setPlayers(players);
    }
  });
  socket.on("server-message", (message) => console.log(message));
  socket.on("movePlayer", (res) => {
    setPlayers(res);
  });
  socket.on("userDisconnected", (players) => {
    setPlayers(players);
  });
  socket.emit("join", player);
};
