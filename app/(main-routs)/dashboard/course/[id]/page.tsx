// app/course/[id]/page.tsx

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin, Card, Typography, List } from "antd";
import type { SingleCourse as Course, Chapter, PDF } from "@/interfaces"; // Adjust the import path
import staticImg from "../../../../../assets/images/static-course-img.jpg";
import Image from "next/image";

const { Title, Text } = Typography;

const fetchCourse = async (id: string): Promise<Course> => {
  const { data } = await axios.get<Course>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/getCourse/${id}`
  );
  return data;
};

const Page: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery<Course, Error>({
    queryKey: ["single course", id],
    queryFn: () => fetchCourse(id),
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Error: {error?.message}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>No course data available.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Card
        cover={
          <Image
            src={staticImg}
            alt={course.title}
            style={{ objectFit: "cover", height: 300 }}
          />
        }
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <Title level={2}>{course.title}</Title>
        <Text>
          Created at: {new Date(course.created_at).toLocaleDateString()}
        </Text>

        {course.chapters && course.chapters.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <Title level={3}>Chapters</Title>
            <List
              dataSource={course.chapters}
              renderItem={(chapter: Chapter) => (
                <List.Item>
                  <List.Item.Meta
                    title={chapter.title}
                    description={chapter.description}
                  />
                </List.Item>
              )}
            />
          </div>
        )}

        {course.pdfs && course.pdfs.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <Title level={3}>PDFs</Title>
            <List
              dataSource={course.pdfs}
              renderItem={(pdf: PDF) => (
                <List.Item>
                  <List.Item.Meta
                    title={pdf.title}
                    description={
                      <a
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Page;
