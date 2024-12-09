"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { IVideo } from "@/interfaces";
import HeaderClassRoom from "@/app/components/classroom/HeaderClassRoom";
import RightSidebar from "@/app/components/classroom/RightSidebar";
import { Tabs, TabsProps } from "antd";
import WhatYouGainComp from "@/app/components/classroom/WhatYouGainComp";
import VideoPlayer from "@/app/components/classroom/VideoPlayer";
import {
  fetchCourseVideos,
  setCurrentVideo,
} from "@/app/store/slices/courseVideosSlice";
import { RootState, useAppDispatch } from "@/app/store/store";

const Page = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false); // Initially hidden
  const params = useParams();
  const courseId = params.id as string;

  const dispatch = useAppDispatch();

  const { courseVideos, currentVideo } = useSelector(
    (state: RootState) => state.courseVideos
  );

  // const [activeTab, setActiveTab] = useState("package");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span style={{ marginInline: 16 }}>عن الكورس</span>,
      children: (
        <div className="px-4">
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            عن الكورس
          </h2>
          <p className="w-full mt-4 text-[#656565] text-right font-[pnu] text-base font-normal leading-[160%]">
            لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
            النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى
            يولدها التطبيق...
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: "عن المحاضر",
      children: (
        <div className="px-4">
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            عن المحاضرة
          </h2>
          <p className="w-full mt-4 text-[#656565] text-right font-[pnu] text-base font-normal leading-[160%]">
            لقد تم توليد هذا النص من مولد النص العربى...
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: "أراء العملاء",
      children: (
        <div className="px-4">
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            أراء العملاء{" "}
          </h2>
          <p className="w-full mt-4 text-[#656565] text-right font-[pnu] text-base font-normal leading-[160%]">
            لقد تم توليد هذا النص من مولد النص العربى...
          </p>
        </div>
      ),
    },
  ];

  const handleVideoSelect = (video: IVideo) => {
    dispatch(setCurrentVideo(video));
  };

  const handleToggleSidebar = () => {
    setToggleSidebar((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchCourseVideos(courseId));
  }, [courseId, dispatch]);

  return (
    <div className="overflow-x-hidden">
      <HeaderClassRoom
        video={currentVideo}
        handleToggleSidebar={handleToggleSidebar}
      />

      {courseVideos ? (
        <VideoPlayer src={currentVideo!} />
      ) : (
        <p>Course not found with this ID.</p>
      )}

      <RightSidebar
        toggleSidebar={toggleSidebar}
        chapters={courseVideos}
        handleVideoSelect={handleVideoSelect}
        handleToggleSidebar={handleToggleSidebar}
        currentVideo={currentVideo}
      />

      <div
        dir="rtl"
        className="lg:px-[92px] py-4 w-full font-[pnu] lg:mb-8 z-30"
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={(key) => console.log(key)}
        />
      </div>
      <WhatYouGainComp />
    </div>
  );
};

export default Page;
