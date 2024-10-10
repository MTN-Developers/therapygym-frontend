"use client";
// import Image from "next/image";
// import videoPlaceholder from "../../assets/images/video-placeholder.svg";
// import playIcon from "../../assets/images/play-icon.svg";
import CoursesSlider from "./CoursesSlider";
import RightSidebar from "./RightSidebar";
import dynamic from "next/dynamic";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
const MainHome = () => {
  return (
    <div className="my-5 flex flex-nowrap justify-around content-center ">
      <div className=" overflow-hidden  w-[854px]">
        <div className="relative w-[854px] h-[372px]">
          <div className="video-player  absolute left-0 top-0 h-full w-full">
            <Plyr
              source={{
                type: "video",
                poster: "https://managethenow.net/test/video-placeholder.svg",
                sources: [
                  {
                    src: "https://mtnlive.s3.amazonaws.com/uploads/Therapy_GYM_Values_May_June_2023/Clips/Therapy_GYM_Values/%D8%A7%D9%84%D9%8A%D9%88%D9%85%20%D8%A7%D9%84%D8%B1%D8%A7%D8%A8%D8%B9_%D8%A7%D9%84%D8%AD%D8%B1%D9%8A%D9%80%D8%A9_%D8%A3%D8%B5%D9%81%D8%B1?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQFC27LM7JPWP4JTN%2F20241010%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241010T090344Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=e9387d0400f744aa99ab12327c626bf176836c67870a752fba89560c010a0025",
                    type: "video/mp4",
                    size: 720,
                  },
                ],
              }}
              preload="auto"
              src="https://mtnlive.s3.amazonaws.com/uploads/Therapy_GYM_Values_May_June_2023/Clips/Therapy_GYM_Values/%D8%A7%D9%84%D9%8A%D9%88%D9%85%20%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB_%D8%A7%D9%84%D9%82%D9%80%D9%80%D9%80%D8%AF%D8%B1%D8%A9_%D8%A3%D8%AD%D9%85%D8%B1?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQFC27LM7JPWP4JTN%2F20241010%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241010T083454Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=b91ac52c96f7bd3ff63b81e580750fb923c652c1d53e8624beaed6389eedc168"
            />
          </div>
          {/* <Image
            src={videoPlaceholder}
            fill
            objectFit="cover"
            alt="image-video"
            className="absolute top-0 left-0"
          /> */}
          {/* <Image
            src={playIcon}
            alt="play"
            className="absolute transform translate-x-1/2 translate-y-1/2 top-[168px] left-[409px]"
          /> */}
          <div className="absolute bottom-4 right-5 text-right">
            {/* <h2 className="text-xl text-white font-[500]">
              برنامج جلسة رجال - الحلقة الثالثة - الكسب عند الرجال
            </h2> */}
            {/* <p className="text-lg text-white font-[500] ">د / أحمد الدملاوى</p> */}
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
