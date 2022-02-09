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
  socket.emit("join", player);
};
