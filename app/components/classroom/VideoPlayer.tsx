"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import { useDispatch } from "react-redux";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { RootState, useAppSelector } from "@/app/store/store";
import RightSidebar from "@/app/components/classroom/RightSidebar";
import { ICourseVideosResponse, IVideo } from "@/interfaces";
import { closeSidebar } from "@/app/store/slices/sidebarSlice";
// import { useTranslations } from "next-intl";

const PlyrVideo = dynamic(() => import("./PlyrVideo"), {
  ssr: false,
});

const MemoizedPlyrVideo = React.memo(({ src }: { src: string }) => (
  <PlyrVideo src={src} />
));

MemoizedPlyrVideo.displayName = "MemoizedPlyrVideo";

// interface VideoPlayerProps {

interface IProps {
  src: IVideo;
  courseVideos: ICourseVideosResponse;
  handleVideoSelect: (_video: IVideo) => void;
  currentVideo: IVideo | null;
}

const VideoPlayer = React.memo(
  ({ src, currentVideo, handleVideoSelect, courseVideos }: IProps) => {
    const { isSidebarOpen } = useAppSelector(
      (state: RootState) => state.sidebar
    );

    const { locale } = useTranslationContext();
    const dispatch = useDispatch();

    const getPlayerPositionClasses = () => {
      if (isSidebarOpen && locale === "ar") {
        return "lg:right-[350px] lg:!w-[72%]";
      }

      if (!isSidebarOpen && locale === "en") {
        return "lg:left-[350px] lg:!w-[72%]";
      }

      return "right-0 left-0";
    };

    /* detects the english and make the sidebar closed to fix a bug in localization */
    useEffect(() => {
      if (locale === "en") {
        dispatch(closeSidebar());
      }
    }, [dispatch, locale]);
    return (
      <div className="relative h-[200px] lg:h-[540px] bg-[#2d2f31] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-[80%] w-full h-full lg:h-[535px] bg-[#424242]">
          <div
            className={`
            absolute top-0 w-full h-full 
            transition-all duration-300
            ${getPlayerPositionClasses()}
          `}
          >
            {src ? (
              <MemoizedPlyrVideo src={src.video_url} />
            ) : (
              <div className="text-white font-bold w-full h-full flex items-center justify-center">
                <p>There are no videos yet.</p>
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <RightSidebar
              chapters={courseVideos}
              handleVideoSelect={handleVideoSelect}
              currentVideo={currentVideo}
            />
          </div>
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
