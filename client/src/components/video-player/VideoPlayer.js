import React, { useRef, useState, useEffect } from "react";
import { initMyStream, callUser } from "../../utils/socket.utils";
import "./videoplayer.css";
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
  // const peers = useRef([]);

  //set up refs dynamically
  // useEffect(() => {
  //   peers.current = new Array(nearbyPlayers.length).fill(null);
  // }, [nearbyPlayers]);

  const setVisibility = () => {
    return isInCall
      ? "video-container visible-vid"
      : "video-container hidden-vid";
  };
  useEffect(() => {
    initMyStream(setStream, myVideo);
  }, []);

  useEffect(() => {
    if (nearbyPlayers && nearbyPlayers.length > 0) {
      setIsInCall(true);

      callUser(nearbyPlayers[0].sID, stream, partnerVideo);
    } else {
      setIsInCall(false);
    }

    //emit join room // recieve list of people in room
  }, [nearbyPlayers]);

  // const renderVideos = () => {
  //   if (nearbyPlayers && nearbyPlayers.length > 0) {
  //     nearbyPlayers.map((video, index) => {
  //       return <video ref={peers.current[index]}></video>;
  //     });
  //   }
  // };
  const handleCall = () => {};
  return (
    <>
      <div className={setVisibility()}>
        <div className="video">
          <video playsInline muted ref={myVideo} autoPlay />
        </div>
        <div className="video">
          <video playsInline ref={partnerVideo} autoPlay />
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
