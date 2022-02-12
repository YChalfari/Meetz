import React, { useState } from "react";
import { characters } from "../../utils/character.utils.js";
import wraith1 from "../../images/characters/wraith/Wraith_resized.png";
import "./player.css";
const Player = ({ player, isFacingForward, position }) => {
  const [character, setCharacter] = useState(player.selectedChar);
  const positionPlayer = () => {
    const styleObj = {};
    if (position) {
      styleObj.gridArea = `${position.x} / ${position.y}`;
    }
    return styleObj;
  };
  const direction = () => {
    const styleObj = {};
    isFacingForward
      ? (styleObj.transform = "scaleX(1)")
      : (styleObj.transform = "scaleX(-1)");
    return styleObj;
  };
  // {
  //       transform: isFacingForward ? "scaleX(1)" : "scaleX(-1)",
  //       gridArea: `${position.x} / ${position.y}`,
  //     }
  return (
    <div className="player" style={positionPlayer()}>
      <div className="player-name-cont">
        <h2 className="player-name player2-font">{player.displayName}</h2>
      </div>
      <img
        style={direction()}
        src={player.selectedChar || character}
        alt="character"
      />
    </div>
  );
};

export default Player;
