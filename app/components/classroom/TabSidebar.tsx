import { Collapse, List } from "antd";
import Image from "next/image";
import videoLibIcon from "@/assets/images/Video Library.svg";
import { ICourseVideosResponse, IVideo } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/app/store/slices/sidebarSlice";

interface IProps {
  chapters: ICourseVideosResponse | null;
  handleVideoSelect: (_video: IVideo) => void;
  currentVideo: IVideo | null;
}

const TabSidebar = React.memo(
  ({ chapters, handleVideoSelect, currentVideo }: IProps) => {
    const t = useTranslations("VideoPage.Sidebar");
    const { locale } = useTranslationContext();
    const { Panel } = Collapse;
    const dispatch = useDispatch();

    const videoCategories = [
      {
        key: "introVideos",
        title: t("Intro"),
        data: chapters?.data?.introVideos || [],
      },
      {
        key: "endVideos",
        title: t("End"),
        data: chapters?.data?.endVideos || [],
      },
      {
        key: "giftVideos",
        title: t("Gifts"),
        data: chapters?.data?.giftVideos || [],
      },
      {
        key: "packageVideos",
        title: t("CourseVideos"),
        data: chapters?.data?.packageVideos || [],
      },
    ];

    // // Get the keys for all non-empty categories
    // const activeKeys = videoCategories
    //   .filter(
    //     (category) => Array.isArray(category.data) && category.data.length > 0
    //   )
    //   .map((category) => category.key);

    return (
      <>
        <div className="block w-full lg:hidden">
          <Collapse
            bordered={false}
            expandIconPosition="end"
            // defaultActiveKey={activeKeys} // Set the default expanded panels
            defaultActiveKey={videoCategories.map((category) => category.key)} // Include all keys, even empty ones
          >
            {/* <p className="text-white font-[pnu] px-6 my-4 text-xl">
              {t("CourseContent")}
            </p> */}
            {videoCategories.map(
              (category) =>
                Array.isArray(category.data) &&
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

TabSidebar.displayName = "TabSidebar";

export default TabSidebar;
