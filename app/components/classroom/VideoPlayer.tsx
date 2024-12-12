import React from "react";
import { ICourseVideosResponse, IVideo } from "@/interfaces";
import dynamic from "next/dynamic";
import RightSidebar from "@/app/components/classroom/RightSidebar";
const PlyrVideo = dynamic(() => import("./PlyrVideo"), {
  ssr: false,
});
interface IProps {
  src: IVideo;
  courseVideos: ICourseVideosResponse;
  handleVideoSelect: (video: IVideo) => void;
  currentVideo: IVideo | null;
}

const VideoPlayer = React.memo(
  ({
    src,
    currentVideo,
    handleVideoSelect,
    courseVideos,
  }: IProps) => {
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
          <div className="h-full">
            {src ? (
              <PlyrVideo src={src.video_url} />
            ) : (
              <>
                <div className="text-white font-bold w-full h-full flex items-center justify-center">
                  <p> There is no Videos yet .</p>
                </div>
              </>
            )}
          </div>
          <RightSidebar
            chapters={courseVideos}
            handleVideoSelect={handleVideoSelect}
            currentVideo={currentVideo}
          />
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
