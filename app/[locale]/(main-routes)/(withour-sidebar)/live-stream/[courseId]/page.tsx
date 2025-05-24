"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Spin } from "antd";
import useSWR from "swr";

import ZoomMeeting from "@/app/components/live/ZoomMeeting";
import { useAppSelector } from "@/app/store/store";
import { getOne } from "@/services/server";

const CourseLivePage = () => {
  const params = useParams();
  const courseId = params.courseId;
  const router = useRouter();
  const t = useTranslations("LiveStreamPage");
  const { user } = useAppSelector((state) => state.auth);

  // Fetch course data
  const {
    data: courses,
    error,
    isLoading,
  } = useSWR<{
    data: {
      data: Array<{
        id: string;
        has_live: boolean;
        status: {
          isSubscribed: boolean;
          isPurchased: boolean;
          isSubscriptionValid: boolean;
        };
      }>;
    };
  }>("/course?limit=1000", getOne);

  // Filter and memoize subscribed/purchased courses
  const myCourses = React.useMemo(() => {
    const my_courses = courses?.data?.data?.filter((course) => {
      const match =
        (course.status?.isSubscribed || course.status?.isPurchased) &&
        course.has_live &&
        course.status?.isSubscriptionValid;
      // console.log(course, match);
      return match;
    });
    return my_courses || [];
  }, [courses?.data?.data]);

  console.log({ myCourses });

  // Check if user has access to this course
  const currentCourse = myCourses.find((course) => course.id === courseId);

  // Redirect if course is not accessible
  React.useEffect(() => {
    if (courses && !currentCourse) {
      router.push("/");
    }
  }, [courses, currentCourse, router]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spin size="large" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    console.error("Error fetching courses:", error);
    return <p className="font-semibold text-xl">Error loading course data</p>;
  }

  // If no course is found, show nothing (will redirect)
  if (!currentCourse) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full h-full items-center justify-center">
      <h2 className="font-semibold text-xl">{t("LiveStream")}</h2>
      <ZoomMeeting
        client_name={`${user?.name} - ${user?.country}`}
        meetingId={"81297066423"}
        passcode={"169998"}
      />
    </div>
  );
};

export default CourseLivePage;
