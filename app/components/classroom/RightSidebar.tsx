import React from "react";
import { Collapse, List } from "antd";
import Image from "next/image";
import videoLibIcon from "@/assets/images/Video Library.svg";
import { IChapter, IVideo } from "@/interfaces";

interface IProps {
  toggleSidebar: boolean;
  chapters: IChapter[] | null;
  handleVideoSelect: (video: IVideo) => void;
  handleToggleSidebar: () => void;
  currentVideo: IVideo | null;
}

const RightSidebar = ({
  toggleSidebar,
  chapters,
  handleVideoSelect,
  handleToggleSidebar,
  currentVideo,
}: IProps) => {
  const { Panel } = Collapse;

  return (
    <div
      dir="rtl"
      className={`lg:w-[495px] lg:h-[535px]   bg-[#2d2f31] transition-transform duration-300 text-white! font-[pnu] absolute top-[66px] right-0 transform ${
        toggleSidebar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <Collapse accordion bordered={false} expandIconPosition="end">
        <p className="text-white font-[pnu] px-6 my-4 text-xl">محتوى الكورس</p>
        {chapters?.map((chapter) => (
          <Panel
            header={
              <>
                <div className="flex w-full items-center gap-4">
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
                  } hover:bg-gray-700  `}
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
  );
};

export default RightSidebar;
