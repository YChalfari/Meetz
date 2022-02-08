import React from "react";
import "./loading.css";
const Loading = ({ spinner }) => {
  return <div className="loading">{spinner}</div>;
};

export default Loading;
