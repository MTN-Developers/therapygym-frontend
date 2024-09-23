import Image from "next/image";
import React from "react";
import videoPlaceholder from "../../../assets/images/video-placeholder.svg";
import playIcon from "../../../assets/images/play-icon.svg";
import CoursesSlider from "./CoursesSlider";
import RightSidebar from "./RightSidebar";

const MainHome = () => {
  return (
    <div className="my-5 flex flex-nowrap justify-between ">
      <div className=" overflow-hidden  w-[854px]">
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
