"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChapters,
  setCourse,
  setCurrentVideo,
} from "@/app/store/slices/playSubscribedCoursesSlice";
import { RootState } from "@/app/store/store";
import { useParams } from "next/navigation";
import { IChapter, IVideo } from "@/interfaces";
import HeaderClassRoom from "@/app/components/classroom/HeaderClassRoom";
import RightSidebar from "@/app/components/classroom/RightSidebar";
import { Tabs, TabsProps } from "antd";
import WhatYouGainComp from "@/app/components/WhatYouGainComp";

const Page = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const params = useParams();
  const courseId = params.id;
  const dispatch = useDispatch();

  const { chapters, course, currentVideo } = useSelector(
    (state: RootState) => state.playSubscribedCourse
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span style={{ marginInline: 16 }}>عن الكورس</span>,
      children: (
        <div>
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            عن الكورس
          </h2>
          <p className="w-full mt-4 text-[#656565] text-right font-[pnu] text-base font-normal leading-[160%]">
            لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
            النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى
            يولدها التطبيق لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك
            أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
            الحروف التى يولدها التطبيق. لقد تم توليد هذا النص من ....{" "}
            <span className="text-blue-500 font-bold cursor-pointer">
              قرأة المزيد
            </span>
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: "عن المحاضر",
      children: (
        <div>
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            عن المحاضرة
          </h2>
          <p className="w-full mt-4 text-[#656565] text-right font-[pnu] text-base font-normal leading-[160%]">
            لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
            النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى أن
            تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
            الحروف التى يولدها التطبيق. لقد تم توليد هذا النص من ....{" "}
            <span className="text-blue-500 font-bold cursor-pointer">
              قرأة المزيد
            </span>
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: "أراء العملاء",
      children: (
        <div>
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            أراء العملاء{" "}
          </h2>
          <p className="w-full mt-4 text-[#656565] text-right font-[pnu] text-base font-normal leading-[160%]">
            لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
            النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى
            يولدها التطبيق لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك
            النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى
            الحروف التى يولدها التطبيق. لقد تم توليد هذا النص من ....{" "}
            <span className="text-blue-500 font-bold cursor-pointer">
              قرأة المزيد
            </span>
          </p>
        </div>
      ),
    },
  ];

  //handlers

  const onChange = (key: string) => {
    console.log(key);
  };
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

  // References
  const playerRef = useRef<any>(null);
  const [playerReady, setPlayerReady] = useState(false);

  // Load YouTube IFrame API
  useEffect(() => {
    // If the API is already loaded, do nothing
    if (window.YT && window.YT.Player) {
      setPlayerReady(true);
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // This function will be called by the YouTube API when it's ready
    (window as any).onYouTubeIframeAPIReady = () => {
      setPlayerReady(true);
    };
  }, []);

  const getAllVideos = useCallback((chapters: IChapter[]): IVideo[] => {
    const allVideos: IVideo[] = [];
    chapters?.forEach((chapter) => {
      allVideos.push(...chapter.videos);
    });
    return allVideos;
  }, []);

  // Initialize the player
  useEffect(() => {
    if (playerReady && videoId) {
      if (playerRef.current) {
        // If player already exists, just load new video
        playerRef.current.loadVideoById(videoId);
      } else {
        playerRef.current = new window.YT.Player("player", {
          videoId: videoId,
          events: {
            onStateChange: onPlayerStateChange,
          },
        });
      }
    }
  }, [playerReady, videoId]);

  const onPlayerStateChange = useCallback(
    (event: any) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        // Video has ended
        console.log("Video ended");

        if (!course?.chapters || !currentVideo) return;

        // Get all videos
        const allVideos = getAllVideos(course.chapters);

        // Find the index of the current video
        const currentVideoIndex = allVideos.findIndex(
          (video) => video.id === currentVideo.id
        );

        if (
          currentVideoIndex !== -1 &&
          currentVideoIndex + 1 < allVideos.length
        ) {
          // Get the next video
          const nextVideo = allVideos[currentVideoIndex + 1];
          console.log("Next video is:", nextVideo);

          // Dispatch the action to set the next video
          dispatch(setCurrentVideo(nextVideo));
        } else {
          console.log("No more videos.");
        }
      }
    },
    [course?.chapters, currentVideo, dispatch, getAllVideos]
  );

  useEffect(() => {
    if (playerReady && videoId) {
      if (playerRef.current) {
        // Destroy existing player before creating a new one
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player("player", {
        videoId: videoId,
        events: {
          onStateChange: onPlayerStateChange,
        },
        playerVars: {
          autoplay: 1, // Enable autoplay
          rel: 0, // Don't show related videos
          modestbranding: 1, // Hide YouTube logo
        },
      });
    }
  }, [playerReady, videoId, onPlayerStateChange]);

  return (
    <div className=" overflow-x-hidden">
      <HeaderClassRoom
        video={currentVideo}
        handleToggleSidebar={handleToggleSidebar}
      />

      {course ? (
        <>
          {videoId ? (
            <div
              style={{
                position: "relative",
                height: "540px",
                backgroundColor: "#2d2f31",
                overflow: "hidden",
              }}
            >
              <div
                id="player"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "50%",
                  transform: "translateX(-50%) ",
                  width: "80%",
                  height: "535px",
                  backgroundColor: "#424242",
                }}
              ></div>
            </div>
          ) : (
            <p>No video available</p>
          )}
        </>
      ) : (
        <p>Course not found with this ID.</p>
      )}

      <RightSidebar
        toggleSidebar={toggleSidebar}
        chapters={chapters}
        handleVideoSelect={handleVideoSelect}
        handleToggleSidebar={handleToggleSidebar}
        currentVideo={currentVideo}
      />

      <div
        dir="rtl"
        className="lg:px-[92px] py-4 w-full font-[pnu] lg:mb-8 z-30"
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
      <WhatYouGainComp />
    </div>
  );
};

export default Page;
