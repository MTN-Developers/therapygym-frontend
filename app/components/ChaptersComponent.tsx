// src/components/ChaptersComponent.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchChapters } from '../store/slices/chaptersSlice';

import { RootState, AppDispatch } from "../store/store";
import { Layout, Collapse, List } from "antd";

const { Sider, Content } = Layout;
const { Panel } = Collapse;

const ChaptersComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chapters, loading, error } = useSelector(
    (state: RootState) => state.chapters
  );
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchChapters());
  }, [dispatch]);

  const handleVideoSelect = (url: string) => {
    setSelectedVideoUrl(url);
  };

  return (
    <Layout style={{ minHeight: "100vh", flexDirection: "row-reverse" }}>
      <Sider width={300} style={{ background: "#fff" }}>
        {loading ? (
          <div>Loading chapters...</div>
        ) : error ? (
          <div>Error loading chapters: {error}</div>
        ) : (
          <Collapse accordion>
            {chapters.map((chapter) => (
              <Panel header={chapter.title} key={chapter.id}>
                <List
                  dataSource={chapter.videos}
                  renderItem={(video) => (
                    <List.Item
                      key={video.id}
                      onClick={() => handleVideoSelect(video.url)}
                      style={{ cursor: "pointer" }}
                    >
                      {video.title}
                    </List.Item>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
        )}
      </Sider>
      <Layout>
        <Content style={{ padding: "24px", background: "#fff" }}>
          {selectedVideoUrl ? (
            <video controls style={{ width: "100%" }}>
              <source src={selectedVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div>Select a video to play</div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChaptersComponent;
