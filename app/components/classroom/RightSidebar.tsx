import { Collapse, List } from "antd";
import Image from "next/image";
import videoLibIcon from "@/assets/images/Video Library.svg";
import { ICourseVideosResponse, IVideo } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";

interface IProps {
  chapters: ICourseVideosResponse | null;
  handleVideoSelect: (video: IVideo) => void;
  currentVideo: IVideo | null;
  toggleSidebar: boolean;
  handleToggleSidebar: () => void;
}

const RightSidebar = ({
  toggleSidebar,
  chapters,
  handleVideoSelect,
  handleToggleSidebar,
  currentVideo,
}: IProps) => {
  const t = useTranslations("VideoPage.Sidebar");
  const { locale } = useTranslationContext();
  const { Panel } = Collapse;

  const videoCategories = [
    {
      key: "introVideos",
      title: t("Intro"),
      data: chapters?.data.introVideos || [],
    },
    {
      key: "giftVideos",
      title: t("Gifts"),
      data: chapters?.data.giftVideos || [],
    },
    {
      key: "packageVideos",
      title: t("CourseVideos"),
      data: chapters?.data.packageVideos || [],
    },
    {
      key: "endVideos",
      title: t("End"),
      data: chapters?.data.endVideos || [],
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {toggleSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleToggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 w-[80%] lg:w-[495px] h-screen bg-[#2d2f31] transition-transform duration-300 text-white font-[pnu] z-50 ${
          toggleSidebar
            ? "translate-x-0"
            : locale == "en"
            ? "translate-x-[-100%]"
            : "translate-x-[100%]"
        }
        
        ${locale == "en" ? "left-0" : "right-0"}
        `}
      >
        <Collapse accordion bordered={false} expandIconPosition="end">
          <p className="text-white font-[pnu] px-6 my-4 text-xl">
            {t("CourseContent")}
          </p>
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
                    dataSource={category.data as IVideo[]}
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
};

export default RightSidebar;
