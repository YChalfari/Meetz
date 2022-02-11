import React, { useRef, useState, useEffect } from "react";
import { initMyStream } from "../../utils/socket.utils";
const VideoPlayer = ({ nearbyPlayers }) => {
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    initMyStream(setStream, myVideo);
  }, []);

  return (
    <div className="video-container">
      <div className="video">
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          style={{ width: "300px", height: "200px" }}
        />
      </div>
      <div className="video">
        <video
          playsInline
          ref={userVideo}
          autoPlay
          style={{ width: "300px", height: "200px" }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
