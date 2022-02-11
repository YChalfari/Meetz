import React, { useState } from "react";
import YouTube from "react-youtube";
import BrownJukebox from "../../../images/jukebox/jukebox-brown.png";
import "./jukebox.css";
const Jukebox = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const ac = new AudioContext();
  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };
  const onReady = (e) => {
    isPlaying ? e.target.pauseVideo() : e.target.playVideo();
    console.log(isPlaying);
  };
  return (
    <div className="jukebox">
      {/* <div className="jukebox-controls"></div> */}
      {/* <YouTube videoId="LWu0wtFXON4" opts={opts} _onReady={onReady} /> */}
      <img onClick={togglePlay} src={BrownJukebox} alt="" />
    </div>
  );
};

export default Jukebox;
