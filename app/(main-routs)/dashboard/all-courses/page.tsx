"use client";

import { useCourses } from "@/app/hooks/useCourses";
import { Card, Spin } from "antd";
import React from "react";
import courseImg from "./../../../../assets/images/static-course-img.jpg";
import Image from "next/image";
import Link from "next/link";

const { Meta } = Card;

const Page = () => {
  const { data: courses, isError, error, isLoading } = useCourses();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main style={{ background: "#fff", padding: 24, minHeight: "100%" }}>
      <h1 className="text-center text-4xl font-[500] mb-4">All Courses</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <>
            <Link key={course.id} href={`/dashboard/course/${course.id}`}>
              <Card
                key={course.id}
                hoverable
                cover={<Image alt={course.title} src={courseImg} />}
              >
                <Meta
                  title={course.title}
                  description={`Created at: ${new Date(
                    course.created_at
                  ).toLocaleDateString()}`}
                />
              </Card>
            </Link>
            <Link key={course.id} href={`/dashboard/course/${course.id}`}>
              <Card
                key={course.id}
                hoverable
                cover={<Image alt={course.title} src={courseImg} />}
              >
                <Meta
                  title={course.title}
                  description={`Created at: ${new Date(
                    course.created_at
                  ).toLocaleDateString()}`}
                />
              </Card>
            </Link>
            <Link key={course.id} href={`/dashboard/course/${course.id}`}>
              <Card
                key={course.id}
                hoverable
                cover={<Image alt={course.title} src={courseImg} />}
              >
                <Meta
                  title={course.title}
                  description={`Created at: ${new Date(
                    course.created_at
                  ).toLocaleDateString()}`}
                />
              </Card>
            </Link>
            <Link key={course.id} href={`/dashboard/course/${course.id}`}>
              <Card
                key={course.id}
                hoverable
                cover={<Image alt={course.title} src={courseImg} />}
              >
                <Meta
                  title={course.title}
                  description={`Created at: ${new Date(
                    course.created_at
                  ).toLocaleDateString()}`}
                />
              </Card>
            </Link>
            <Link key={course.id} href={`/dashboard/course/${course.id}`}>
              <Card
                key={course.id}
                hoverable
                cover={<Image alt={course.title} src={courseImg} />}
              >
                <Meta
                  title={course.title}
                  description={`Created at: ${new Date(
                    course.created_at
                  ).toLocaleDateString()}`}
                />
              </Card>
            </Link>
          </>
        ))}
      </div>
    </main>
  );
};

export default Page;
