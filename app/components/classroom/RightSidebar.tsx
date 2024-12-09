import { Collapse, List } from "antd";
import Image from "next/image";
import videoLibIcon from "@/assets/images/Video Library.svg";
import { ICourseVideosResponse, IVideo } from "@/interfaces";

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
  const { Panel } = Collapse;

  const videoCategories = [
    {
      key: "introVideos",
      title: "مقدمة",
      data: chapters?.data.introVideos.data || [],
    },
    {
      key: "endVideos",
      title: "نهاية",
      data: chapters?.data.endVideos.data || [],
    },
    {
      key: "giftVideos",
      title: "الهدايا",
      data: chapters?.data.giftVideos?.data || [],
    },
    {
      key: "packageVideos",
      title: "الكورس",
      data: chapters?.data.packageVideos || [],
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
        dir="rtl"
        className={`fixed top-0 right-0 w-[80%] lg:w-[495px] h-screen bg-[#2d2f31] transition-transform duration-300 text-white font-[pnu] z-50 ${
          toggleSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Collapse accordion bordered={false} expandIconPosition="end">
          <p className="text-white font-[pnu] px-6 my-4 text-xl">
            محتوى الكورس
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
                          {video.title_ar}
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
