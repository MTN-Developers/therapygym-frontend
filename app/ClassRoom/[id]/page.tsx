"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChapters,
  setCourse,
  setCurrentVideo,
} from "@/app/store/slices/playSubscribedCoursesSlice";
import { RootState } from "@/app/store/store";
import { useParams } from "next/navigation";
import { Collapse, List } from "antd";
import { IVideo } from "@/interfaces";
import HeaderClassRoom from "@/app/components/classroom/HeaderClassRoom";
import videoLibIcon from "@/assets/images/Video Library.svg";
import videoArrowIcon from "@/assets/images/video arrow.svg";
import Image from "next/image";

const { Panel } = Collapse;

const Page = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const params = useParams();
  const courseId = params.id;
  const dispatch = useDispatch();

  const { chapters, course, currentVideo } = useSelector(
    (state: RootState) => state.playSubscribedCourse
  );

  //handlers

  const handleVideoSelect = (video: IVideo) => {
    dispatch(setCurrentVideo(video));
  };

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  useEffect(() => {
    // Fetch course data from API
    fetch(`http://localhost:3001/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCourse(data));
        dispatch(setChapters(data.chapters));

        // Check if chapters and videos exist before accessing
        if (
          data.chapters &&
          data.chapters.length > 0 &&
          data.chapters[0].videos &&
          data.chapters[0].videos.length > 0
        ) {
          dispatch(setCurrentVideo(data.chapters[0].videos[0]));
        } else {
          dispatch(setCurrentVideo(null));
        }
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, [courseId, dispatch]);

  // Function to extract YouTube video ID from URL
  const extractYouTubeVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = currentVideo?.url
    ? extractYouTubeVideoId(currentVideo.url)
    : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <div className="bg-gray-400 overflow-x-hidden">
      <HeaderClassRoom
        video={currentVideo}
        handleToggleSidebar={handleToggleSidebar}
      />

      {course ? (
        <>
          {embedUrl ? (
            <div
              style={{
                position: "relative",
                height: "540px",
                backgroundColor: "#2d2f31",
                overflow: "hidden",
              }}
            >
              <iframe
                src={embedUrl}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%) ",
                  width: "80%",
                  height: "535px",
                  backgroundColor: "#424242",
                }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video Player"
              ></iframe>
            </div>
          ) : (
            <p>No video available</p>
          )}
        </>
      ) : (
        <p>Course not found with this ID.</p>
      )}

      <div
        dir="rtl"
        className={`lg:w-[495px] lg:h-[535px] py-6  bg-[#2d2f31] transition-transform duration-300 text-white! font-[pnu] absolute top-[66px] right-0 transform ${
          toggleSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Collapse
          accordion
          bordered={false}
          expandIconPosition="end"
          expandIcon={() => (
            <>
              <Image src={videoArrowIcon} alt="arrow" />
            </>
          )}
        >
          <p className="text-white font-[pnu] px-6 my-4 text-xl">
            محتوى الكورس
          </p>
          {chapters?.map((chapter) => (
            <Panel
              header={
                <>
                  <div
                    style={{
                      background: "#545454",
                    }}
                    className="flex items-center gap-4"
                  >
                    <Image src={videoLibIcon} alt="video icon" />
                    <p className="text-white font-bold">{chapter.title}</p>
                  </div>
                </>
              }
              key={chapter.id}
            >
              <List
                style={{ background: "#2d2f31" }}
                dataSource={chapter.videos}
                renderItem={(video) => (
                  <List.Item
                    key={video.id}
                    onClick={() => {
                      handleVideoSelect(video);
                      handleToggleSidebar();
                    }}
                    style={{ cursor: "pointer" }}
                    className={`${
                      video.id === currentVideo?.id
                        ? "bg-gray-500"
                        : "bg-[#2d2f31]"
                    } `}
                  >
                    <p
                      className={`px-4 ${
                        video.id === currentVideo?.id
                          ? "text-white"
                          : "text-[#8d8d8d]"
                      } `}
                    >
                      {video.title}
                    </p>
                  </List.Item>
                )}
              />
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default Page;
