import React from "react";
import PlyrVideo from "./PlyrVideo";
import { IVideo } from "@/interfaces";

interface IProps {
  src: IVideo;
}

const VideoPlayer = React.memo(({ src }: IProps) => {
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
      >
        <PlyrVideo src={src.video_url} />
      </div>
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
