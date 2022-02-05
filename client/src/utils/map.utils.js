export const matrixGenerator = (arr, rows, cols, blocktype) => {
  for (let i = 1; i <= rows; i++) {
    arr.push(Array(cols).fill(blocktype));
  }
};
export const movePlayer = ({ key }, setPos) => {
  switch (key) {
    case "w": {
      setPos((prev) => {
        return { ...prev, x: prev.x-- };
      });
      break;
    }

    case "a": {
      setPos((prev) => {
        return { ...prev, isFacingForward: false, y: prev.y-- };
      });
      break;
    }

    case "s": {
      setPos((prev) => {
        return { ...prev, x: prev.x++ };
      });
      break;
    }
    case "d": {
      setPos((prev) => {
        return { ...prev, isFacingForward: true, y: prev.y++ };
      });
      break;
    }

    default:
      return;
  }
};
