import React from "react";

const VideoPlayer = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "540px",
        backgroundColor: "#2d2f31",
        overflow: "hidden",
      }}
    >
      <div
        id="player"
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "535px",
          backgroundColor: "#424242",
        }}
      ></div>
    </div>
  );
};

export default VideoPlayer;
