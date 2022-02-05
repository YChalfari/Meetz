import React, { useState } from "react";
import { characters } from "../../utils/character.utils.js";
import wraith1 from "../../images/characters/wraith/Wraith_resized.png";
import "./player.css";
const Player = ({ isFacingForward, character }) => {
  const [selectedChar, setSelectedChar] = useState("minotaur");
  const { wraith, minotaur } = characters;
  return (
    <div
      className="player"
      style={{ transform: isFacingForward ? "scaleX(1)" : "scaleX(-1)" }}
    >
      <img src={characters[selectedChar].idle} alt="character" />
    </div>
  );
};

export default Player;
