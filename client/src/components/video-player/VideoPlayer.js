import React, { useRef, useState, useEffect } from "react";
import { initMyStream, callUser } from "../../utils/socket.utils";
const VideoPlayer = ({
  nearbyPlayers,
  isInCall,
  setIsInCall,
  recipient,
  userStream,
}) => {
  const [stream, setStream] = useState();
  const [partnerStream, setPartnerStream] = useState(userStream);
  const myVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    initMyStream(setStream, myVideo);
    //emit join room // recieve list of people in room
  }, [isInCall]);
  const handleCall = () => {};
  return (
    <>
      {isInCall && (
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
              ref={partnerVideo}
              autoPlay
              style={{ width: "300px", height: "200px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
