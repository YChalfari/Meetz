import React from "react";

const Video = ({ peer }) => {
  return (
    <div className="video">
      <video playsInline ref={peer} autoPlay />
    </div>
  );
};

export default Video;
