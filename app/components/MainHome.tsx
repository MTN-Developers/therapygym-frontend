"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import videoPlaceholder from "../../assets/images/video-placeholder.svg";
import playIcon from "../../assets/images/play-icon.svg";
import CoursesSlider from "./CoursesSlider";
import RightSidebar from "./RightSidebar";
// import VideoPlayer from "./VideoPlayer";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const MainHome = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: ["play", "progress", "volume", "fullscreen", "settings"],
      });
      return () => {
        player.destroy();
      };
    }
  }, []);

  return (
    <div className="my-5 flex flex-nowrap justify-around content-center ">
      <div className=" overflow-hidden  w-[854px]">
        <div className="video-player">
          <video ref={videoRef} id="player" playsInline controls>
            <source
              src={
                "https://mtnlive.s3.amazonaws.com/uploads/EBM/Clips/CH1/EBM_%D9%85%D9%82%D8%AF%D9%85%D8%A9_%D8%AA%D8%B9%D8%B1%D9%8A%D9%81%D9%8A%D8%A9_%D8%B9%D9%86_?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQFC27LM7JPWP4JTN%2F20241010%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241010T073235Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=52fc75d7b14c5ca7c93bca72918dc11d2ac92dda093c603c0b36dc9e456aa2de"
              }
            />
          </video>
        </div>
        <div className="relative w-[854px] h-[372px]">
          <Image
            src={videoPlaceholder}
            fill
            objectFit="cover"
            alt="image-video"
            className="absolute top-0 left-0"
          />
          <Image
            src={playIcon}
            alt="play"
            className="absolute transform translate-x-1/2 translate-y-1/2 top-[168px] left-[409px]"
          />
          <div className="absolute bottom-4 right-5 text-right">
            <h2 className="text-xl text-white font-[500]">
              برنامج جلسة رجال - الحلقة الثالثة - الكسب عند الرجال
            </h2>
            <p className="text-lg text-white font-[500] ">د / أحمد الدملاوى</p>
          </div>
          <div className="absolute top-2 left-2 bg-[#ff0000] rounded-2xl px-1 flex items-center gap-[5px]">
            <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
            <span className="text-white font-bold">Live</span>
          </div>
        </div>
        <CoursesSlider />
      </div>
      <RightSidebar />
    </div>
  );
};

export default MainHome;
