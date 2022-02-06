import React, { useState } from "react";
import { characters } from "../../utils/character.utils.js";
import wraith1 from "../../images/characters/wraith/Wraith_resized.png";
import "./player.css";
const Player = ({ isFacingForward, character, position }) => {
  const [selectedChar, setSelectedChar] = useState("minotaur");
  const { wraith, minotaur } = characters;
  const style = () => {
    const styleObj = {};
    isFacingForward
      ? (styleObj.transform = "scaleX(1)")
      : (styleObj.transform = "scaleX(-1)");
    if (position) {
      styleObj.gridArea = `${position.x} / ${position.y}`;
    }
    return styleObj;
  };
  // {
  //       transform: isFacingForward ? "scaleX(1)" : "scaleX(-1)",
  //       gridArea: `${position.x} / ${position.y}`,
  //     }
  return (
    <div className="player" style={style()}>
      <img src={characters[selectedChar].idle} alt="character" />
    </div>
  );
};

export default Player;
