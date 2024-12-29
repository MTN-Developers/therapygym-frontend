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
import { Spin, Tabs, TabsProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import TabSidebar from "@/app/components/classroom/TabSidebar";
import { useTranslationContext } from "@/contexts/TranslationContext";

const Page = () => {
  const { locale } = useTranslationContext();
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

  // const handleVideoSelect = (video: IVideo) => {
  //   dispatch(setCurrentVideo(video));
  // };

  const handleVideoSelect = (video: IVideo) => {
    dispatch(setCurrentVideo(video));
  };

  const { currentVideo } = useSelector(
    (state: RootState) => state.courseVideos
  );

  const courseVideos = {
    data: {
      packageVideos: data?.data,
    },
  };

  useEffect(() => {
    dispatch(fetchCourseVideos(courseId));
  }, [courseId, dispatch]);

  return (
    <div className="overflow-x-hidden h-screen">
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

      <div className="!h-[58vh] block lg:hidden overflow-scroll">
        <TabSidebar
          chapters={courseVideos as any}
          handleVideoSelect={handleVideoSelect}
          currentVideo={currentVideo}
        />
      </div>
    </div>
  );
};

export default Page;
