"use client";

import CoursesSlider from "./CoursesSlider";

// import Image from "next/image";
// import videoPlaceholder from "../../assets/images/video-placeholder.svg";
// import playIcon from "../../assets/images/play-icon.svg";
// import CoursesSlider from "./CoursesSlider";
// import RightSidebar from "./RightSidebar";
// import CustomHeader from "./CustomHeader";
// import RightSidebar from "./RightSidebar";
// import dynamic from "next/dynamic";

// const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
const MainHome = () => {
  return (
    <>
      {/* <div className=" hidden my-5 lg:flex flex-nowrap justify-around content-center ">
        <div className=" overflow-hidden  w-[854px]">
          <div className="relative w-[854px] h-[372px]">
            <div className="video-player  absolute left-0 top-0 h-full w-full">
              <Plyr
                source={{
                  type: "video",
                  poster:
                    "https://managethenow.net/test/video-placeholder2.png",
                  sources: [
                    {
                      src: "https://mtnlive.s3.amazonaws.com/uploads/TG-Estro-Recorded/Est_1st_Session_16_October_2021.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQFC27LM7JPWP4JTN%2F20241015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241015T083222Z&X-Amz-SignedHeaders=host&X-Amz-Expires=14400&X-Amz-Signature=e28d16d2ba1d55cc511ba9823bc9faf83ddf6aa5b00a492b85f18380c4d9a50c",
                      type: "video/mp4",
                      size: 720,
                    },
                  ],
                }}
                preload="auto"
                src="https://mtnlive.s3.amazonaws.com/uploads/TG-Estro-Recorded/Est_1st_Session_16_October_2021.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQFC27LM7JPWP4JTN%2F20241015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241015T083222Z&X-Amz-SignedHeaders=host&X-Amz-Expires=14400&X-Amz-Signature=e28d16d2ba1d55cc511ba9823bc9faf83ddf6aa5b00a492b85f18380c4d9a50c"
              />
            </div>

            <div className="absolute bottom-4 right-5 text-right"></div>
            <div className="absolute top-2 left-2 bg-[#ff0000] rounded-2xl px-1 flex items-center gap-[5px]">
              <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
              <span className="text-white font-bold">Live</span>
            </div>
          </div>
          <CoursesSlider />
        </div>
        <RightSidebar />
      </div>
      <div className=" lg:hidden flex flex-col gap-4 px-4 ">
        <div className="relative w-full h-[285px] ">
          <div className="video-player absolute left-0 top-0 h-full w-full">
            <Plyr
              source={{
                type: "video",
                poster: "https://managethenow.net/test/video-placeholder2.png",
                sources: [
                  {
                    src: "https://mtnlive.s3.amazonaws.com/uploads/TG-Estro-Recorded/Est_1st_Session_16_October_2021.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQFC27LM7JPWP4JTN%2F20241015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241015T083222Z&X-Amz-SignedHeaders=host&X-Amz-Expires=14400&X-Amz-Signature=e28d16d2ba1d55cc511ba9823bc9faf83ddf6aa5b00a492b85f18380c4d9a50c",
                    type: "video/mp4",
                    size: 720,
                  },
                ],
              }}
              preload="auto"
              src="https://mtnlive.s3.amazonaws.com/uploads/TG-Estro-Recorded/Est_1st_Session_16_October_2021.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQFC27LM7JPWP4JTN%2F20241015%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241015T083222Z&X-Amz-SignedHeaders=host&X-Amz-Expires=14400&X-Amz-Signature=e28d16d2ba1d55cc511ba9823bc9faf83ddf6aa5b00a492b85f18380c4d9a50c"
            />
          </div>

          <div className="absolute bottom-4 right-5 text-right"></div>
          <div className="absolute top-2 left-2 bg-[#ff0000] rounded-2xl px-1 flex items-center gap-[5px]">
            <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
            <span className="text-white font-bold">Live</span>
          </div>
        </div>
        <RightSidebar />
      </div> */}

      <div className="my-5 flex flex-nowrap justify-around content-center ">
        <CoursesSlider />
      </div>
    </>
  );
};

export default MainHome;
