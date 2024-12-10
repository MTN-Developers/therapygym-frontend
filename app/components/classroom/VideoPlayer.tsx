import React from "react";
import { IVideo } from "@/interfaces";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const PlyrVideo = dynamic(() => import("./PlyrVideo"), {
  ssr: false,
});

interface IProps {
  src: IVideo;
}

const VideoPlayer = React.memo(({ src }: IProps) => {
  const t = useTranslations("VideoPlayer");

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
        {src ? (
          <PlyrVideo src={src.video_url} />
        ) : (
          <div className="text-white font-bold w-full h-full flex items-center justify-center">
            <p>{t("NoVideos")}</p>
          </div>
        )}
      </div>
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
