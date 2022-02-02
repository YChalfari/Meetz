export const matrixGenerator = (arr, rows, cols, blocktype) => {
  for (let i = 1; i <= rows; i++) {
    arr.push(Array(cols).fill(blocktype));
  }
};
export const movePlayer = ({ key }, setter) => {
  switch (key) {
    case "w": {
      setter((prev) => {
        return { ...prev, x: prev.x-- };
      });
      break;
    }

    case "a": {
      setter((prev) => {
        return { ...prev, y: prev.y-- };
      });
      break;
    }

    case "s": {
      setter((prev) => {
        return { ...prev, x: prev.x++ };
      });
      break;
    }
    case "d": {
      setter((prev) => {
        return { ...prev, y: prev.y++ };
      });
      break;
    }

    default:
      return;
  }
};
