"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { IVideo } from "@/interfaces";
import HeaderClassRoom from "@/app/components/classroom/HeaderClassRoom";
import { Spin, Tabs, TabsProps } from "antd";
// import WhatYouGainComp from "@/app/components/classroom/WhatYouGainComp";
// import VideoPlayer from "@/app/components/classroom/VideoPlayer";
import {
  fetchCourseVideos,
  setCurrentVideo,
} from "@/app/store/slices/courseVideosSlice";
import { RootState, useAppDispatch } from "@/app/store/store";
import { useTranslations } from "next-intl";
import useSWR from "swr";
import { getOne } from "@/services/server";
import { useTranslationContext } from "@/contexts/TranslationContext";
import TabSidebar from "@/app/components/classroom/TabSidebar";
import { LoadingOutlined } from "@ant-design/icons";
import VideoPlayer from "../../videos-list/VideoPlayer";

const Page = () => {
  const t = useTranslations("ClassroomPage");
  // const [toggleSidebar, setToggleSidebar] = useState(false); // Initially hidden
  const params = useParams();
  const courseId = params.id as string;
  const { data, isLoading } = useSWR<getCourse>(`course/${courseId}`, getOne);
  const dispatch = useAppDispatch();

  const { locale } = useTranslationContext();
  const { courseVideos, currentVideo } = useSelector(
    (state: RootState) => state.courseVideos
  );

  const handleVideoSelect = (video: IVideo) => {
    dispatch(setCurrentVideo(video));
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span className="block lg:hidden" style={{ marginInline: 16 }}>
          {t("CourseContent")}
        </span>
      ),
      children: (
        <div className="!h-[48vh] overflow-scroll">
          <TabSidebar
            chapters={courseVideos}
            handleVideoSelect={handleVideoSelect}
            currentVideo={currentVideo}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: <span style={{ marginInline: 16 }}>{t("AboutCourse")}</span>,
      children: (
        <div className="px-4">
          <h2 className="text-[#007AFE] text-center font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            {t("AboutCourse")}
          </h2>
          <p className="w-full mt-4 text-[#656565]  font-[pnu] text-base font-normal leading-[160%]">
            {locale == "ar"
              ? data?.data?.description_ar
              : data?.data?.description_en}
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: t("AboutLecturer"),
      children: (
        <div className="px-4">
          <h2 className="text-[#007AFE] text-center font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            {t("AboutLecturer")}
          </h2>
          <p className="w-full mt-4 text-[#656565]  font-[pnu] text-base font-normal leading-[160%]">
            {t("PlaceholderText")}
          </p>
        </div>
      ),
    },
    // {
    //   key: "4",
    //   label: t("CustomerReviews"),
    //   children: (
    //     <div className="px-4">
    //       <h2 className="text-[#007AFE] text-center font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
    //         {t("CustomerReviews")}
    //       </h2>
    //       <p className="w-full mt-4 text-[#656565]  font-[pnu] text-base font-normal leading-[160%]">
    //         {t("PlaceholderText")}
    //       </p>
    //     </div>
    //   ),
    // },
  ];

  // const handleToggleSidebar = () => {
  //   setToggleSidebar((prev) => !prev);
  // };

  useEffect(() => {
    dispatch(fetchCourseVideos(courseId));
  }, [courseId, dispatch]);

  return (
    <div className="overflow-hidden">
      <HeaderClassRoom
        video={currentVideo}
        // handleToggleSidebar={handleToggleSidebar}
        // toggleSidebar={toggleSidebar}
      />

      {courseVideos ? (
        <VideoPlayer
          key={currentVideo?.id} // Add this line
          src={currentVideo!}
          handleVideoSelect={handleVideoSelect}
          courseVideos={courseVideos as any}
          currentVideo={currentVideo}
        />
      ) : isLoading ? (
        <Spin indicator={<LoadingOutlined />} />
      ) : (
        <p>{t("CourseNotFound")}</p>
      )}

      <div className="lg:px-[92px] py-4 w-full font-[pnu] lg:mb-8 z-30">
        <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
      </div>
      {/* <WhatYouGainComp /> */}
    </div>
  );
};

export default Page;
