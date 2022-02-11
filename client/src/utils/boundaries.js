const isClose = (pos1, pos2) => {
  if (
    pos1.x >= pos2.x - 1 &&
    pos1.x <= pos2.x + 1 &&
    pos1.y >= pos2.y - 1 &&
    pos1.y <= pos2.y + 1
  ) {
    return true;
  } else {
    return false;
  }
};
export const playerProximity = (players, player) => {
  let nearbyPlayers = [];
  console.log(players);
  players.forEach((p) => {
    if (p.id !== player.id) {
      if (isClose(player.position, p.position)) {
        nearbyPlayers.push(p);
        // console.log(p.position, player.position);
        console.log(p);
      }
    }
  });
  return nearbyPlayers;
};
