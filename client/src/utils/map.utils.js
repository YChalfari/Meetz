import office from "../images/maps/office/office.png";
// import { playerProximity } from "./boundaries";

export const maps = { office };

// export const matrixGenerator = (arr, rows, cols, players) => {
//   for (let i = 1; i <= rows; i++) {
//     arr.push(Array(cols).fill());
//   }
// };
export const movePlayer = ({ key }, player, players) => {
  switch (key) {
    case "w": {
      if (player.position.x === 5) return;
      player.position.x--;
      break;
      // return playerProximity(players, player);
    }

    case "a": {
      if (player.position.y === 1) return;
      player.isFacingForward = false;
      player.position.y--;
      break;
      // return playerProximity(players, player);
    }

    case "s": {
      if (player.position.x === 20) return;
      player.position.x++;
      break;
      // return playerProximity(players, player);
    }
    case "d": {
      if (player.position.y === 20) return;
      player.position.y++;
      player.isFacingForward = true;
      break;
      // return playerProximity(players, player);
    }

    default:
      return;
  }
};
