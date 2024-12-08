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
import WhatYouGainComp from "@/app/components/classroom/WhatYouGainComp";
import VideoPlayer from "@/app/components/classroom/VideoPlayer";

// YouTube Player Types
interface YouTubePlayer {
  loadVideoById: (videoId: string) => void;
  destroy: () => void;
}

interface YouTubeEvent {
  data: number;
}

interface YouTubePlayerState {
  ENDED: number;
}

interface YouTubeWindow extends Window {
  YT: {
    Player: new (
      elementId: string,
      config: {
        videoId: string;
        events?: {
          onStateChange?: (event: YouTubeEvent) => void;
        };
        playerVars?: {
          autoplay?: number;
          rel?: number;
          modestbranding?: number;
        };
      }
    ) => YouTubePlayer;
    PlayerState: YouTubePlayerState;
  };
  onYouTubeIframeAPIReady?: () => void;
}

declare const window: YouTubeWindow;

const Page = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const params = useParams();
  const courseId = params.id as string;
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

  const extractYouTubeVideoId = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = currentVideo?.url
    ? extractYouTubeVideoId(currentVideo.url)
    : null;

  const playerRef = useRef<YouTubePlayer | null>(null);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
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

    window.onYouTubeIframeAPIReady = () => {
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

  useEffect(() => {
    if (playerReady && videoId) {
      if (playerRef.current) {
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
    (event: YouTubeEvent) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        console.log("Video ended");

        if (!course?.chapters || !currentVideo) return;

        const allVideos = getAllVideos(course.chapters);
        const currentVideoIndex = allVideos.findIndex(
          (video) => video.id === currentVideo.id
        );

        if (
          currentVideoIndex !== -1 &&
          currentVideoIndex + 1 < allVideos.length
        ) {
          const nextVideo = allVideos[currentVideoIndex + 1];
          console.log("Next video is:", nextVideo);
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
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player("player", {
        videoId: videoId,
        events: {
          onStateChange: onPlayerStateChange,
        },
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
        },
      });
    }
  }, [playerReady, videoId, onPlayerStateChange]);

  return (
    <div className="overflow-x-hidden">
      <HeaderClassRoom
        video={currentVideo}
        handleToggleSidebar={handleToggleSidebar}
      />

      {course ? (
        <>{videoId ? <VideoPlayer /> : <p>No video available</p>}</>
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
