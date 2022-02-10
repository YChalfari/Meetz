import office from "../images/maps/office/office.png";
export const maps = { office };

export const matrixGenerator = (arr, rows, cols, players) => {
  for (let i = 1; i <= rows; i++) {
    arr.push(Array(cols).fill());
  }
};
export const movePlayer = ({ key }, player) => {
  switch (key) {
    case "w": {
      player.position.x--;
      break;
    }

    case "a": {
      player.isFacingForward = false;
      player.position.y--;
      break;
    }

    case "s": {
      player.position.x++;
      break;
    }
    case "d": {
      player.position.y++;
      player.isFacingForward = true;
      break;
    }

    default:
      return;
  }
};
