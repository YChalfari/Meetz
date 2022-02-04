import React from "react";
import Player from "../player";
import "./tile.css";
const Tile = ({ className, player, isFacingForward }) => {
  return (
    <div className={className}>
      {player && <Player isFacingForward={isFacingForward} />}
    </div>
  );
};

export default Tile;
