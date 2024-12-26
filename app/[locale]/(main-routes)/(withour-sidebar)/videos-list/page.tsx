/* eslint-disable no-unused-vars */
"use client";

declare global {
  interface Window {
    ManagedMediaSource?: any;
  }
}
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { IVideo } from "@/interfaces";
import HeaderClassRoom from "./HeaderClassRoom";
// import WhatYouGainComp from "@/app/components/classroom/WhatYouGainComp";
import VideoPlayer from "./VideoPlayer";
import {
  fetchCourseVideos,
  setCurrentVideo,
} from "@/app/store/slices/courseVideosSlice";
import { RootState, useAppDispatch } from "@/app/store/store";
import { useTranslations } from "next-intl";
import useSWR from "swr";
import { getOne } from "@/services/server";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// import useSWR from "swr";
// import { getOne } from "@/services/server";
// import { useTranslationContext } from "@/contexts/TranslationContext";
//
const Page = () => {
  const t = useTranslations("ClassroomPage");
  // const [toggleSidebar, setToggleSidebar] = useState(false); // Initially hidden
  const params = useParams();
  const courseId = params.id as string;

  const { data, isLoading } = useSWR<any>(`video/subscription/test/`, getOne, {
    revalidateOnFocus: false,
    onSuccess: (data) => {
      dispatch(setCurrentVideo(data?.data[0]));
    },
  });
  const dispatch = useAppDispatch();

  const { currentVideo } = useSelector(
    (state: RootState) => state.courseVideos
  );

  const courseVideos = {
    data: {
      packageVideos: data?.data,
    },
  };

  // const items: TabsProps["items"] = [
  //   {
  //     key: "1",
  //     label: <span style={{ marginInline: 16 }}>{t("AboutCourse")}</span>,
  //     children: (
  //       <div className="px-4">
  //         <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
  //           {t("AboutCourse")}
  //         </h2>
  //         <p className="w-full mt-4 text-[#656565]  font-[pnu] text-base font-normal leading-[160%]">
  //           {locale == "ar"
  //             ? data?.data?.description_ar
  //             : data?.data?.description_en}
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     label: t("AboutLecturer"),
  //     children: (
  //       <div className="px-4">
  //         <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
  //           {t("AboutLecturer")}
  //         </h2>
  //         <p className="w-full mt-4 text-[#656565]  font-[pnu] text-base font-normal leading-[160%]">
  //           {t("PlaceholderText")}
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: t("CustomerReviews"),
  //     children: (
  //       <div className="px-4">
  //         <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
  //           {t("CustomerReviews")}
  //         </h2>
  //         <p className="w-full mt-4 text-[#656565]  font-[pnu] text-base font-normal leading-[160%]">
  //           {t("PlaceholderText")}
  //         </p>
  //       </div>
  //     ),
  //   },
  // ];

  const handleVideoSelect = (video: IVideo) => {
    dispatch(setCurrentVideo(video));
  };

  useEffect(() => {
    dispatch(fetchCourseVideos(courseId));
  }, [courseId, dispatch]);

  return (
    <div className="overflow-x-hidden h-dvh">
      <HeaderClassRoom video={currentVideo} />

      {data?.data ? (
        <VideoPlayer
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
    </div>
  );
};

export default Page;
