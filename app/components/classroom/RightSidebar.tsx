import { Collapse, List } from "antd";
import Image from "next/image";
import videoLibIcon from "@/assets/images/Video Library.svg";
import { ICourseVideosResponse, IVideo } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/app/store/slices/sidebarSlice";
import { RootState } from "@/app/store/store";

interface IProps {
  chapters: ICourseVideosResponse | null;
  handleVideoSelect: (_video: IVideo) => void;
  currentVideo: IVideo | null;
}

const RightSidebar = React.memo(
  ({ chapters, handleVideoSelect, currentVideo }: IProps) => {
    const t = useTranslations("VideoPage.Sidebar");
    const { locale } = useTranslationContext();
    const { Panel } = Collapse;
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector(
      (state: RootState) => state.sidebar.isSidebarOpen
    );

    const videoCategories = [
      {
        key: "introVideos",
        title: t("Intro"),
        data: chapters?.data.introVideos.data || [],
      },
      {
        key: "endVideos",
        title: t("End"),
        data: chapters?.data.endVideos.data || [],
      },
      {
        key: "giftVideos",
        title: t("Gifts"),
        data: chapters?.data.giftVideos?.data || [],
      },
      {
        key: "packageVideos",
        title: t("CourseVideos"),
        data: chapters?.data.packageVideos || [],
      },
    ];

    // Get the keys for all non-empty categories
    const activeKeys = videoCategories
      .filter((category) => category.data.length > 0)
      .map((category) => category.key);

    return (
      <>
        {/* Backdrop */}
        {isSidebarOpen && (
          <div
            className="lg:hidden w-screen fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => dispatch(toggleSidebar())}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-0 w-[80%] h-full lg:w-[495px]  bg-[#2d2f31] transition-transform duration-300 text-white font-[pnu] z-50 ${
            isSidebarOpen
              ? locale == "en"
                ? "translate-x-[-200%]"
                : " translate-x-[14%]  lg:translate-x-[33%]"
              : locale == "ar"
              ? "translate-x-[200%]"
              : "-translate-x-[14%]  lg:-translate-x-[30%]"
          }
        
        ${locale == "en" ? "left-0" : "right-0"}
        `}
        >
          <Collapse
            bordered={false}
            expandIconPosition="end"
            defaultActiveKey={activeKeys} // Set the default expanded panels
          >
            <p className="text-white font-[pnu] px-6 my-4 text-xl">
              {t("CourseContent")}
            </p>
            {videoCategories.map(
              (category) =>
                category.data.length > 0 && (
                  <Panel
                    key={category.key}
                    header={
                      <div className="flex w-full items-center gap-4">
                        <Image src={videoLibIcon} alt="video icon" />
                        <p className="text-white font-bold">{category.title}</p>
                      </div>
                    }
                  >
                    <List
                      style={{ background: "#2d2f31" }}
                      dataSource={category.data}
                      renderItem={(video) => (
                        <List.Item
                          key={video.id}
                          onClick={() => {
                            handleVideoSelect(video);
                            dispatch(toggleSidebar());
                          }}
                          style={{ cursor: "pointer" }}
                          className={`${
                            video.id === currentVideo?.id
                              ? "bg-gray-500"
                              : "bg-[#2d2f31]"
                          } hover:bg-gray-700`}
                        >
                          <p
                            className={`px-4 ${
                              video.id === currentVideo?.id
                                ? "text-white"
                                : "text-[#8d8d8d]"
                            }`}
                          >
                            {locale === "ar" ? video.title_ar : video.title_en}
                          </p>
                        </List.Item>
                      )}
                    />
                  </Panel>
                )
            )}
          </Collapse>
        </div>
      </>
    );
  }
);

RightSidebar.displayName = "RightSidebar";

export default RightSidebar;
