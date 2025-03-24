"use client";
import RightSideCourseComp from "@/app/components/course/RightSideCourseComp";
import { getOne } from "@/services/server";
import { ConfigProvider, Spin, TabsProps } from "antd";
import React from "react";
import useSWR from "swr";
import { LoadingOutlined } from "@ant-design/icons";
import LeftSideCourseComp from "@/app/components/course/LeftSideCourseComp";
import Image from "next/image";
import strokGroup from "@/assets/images/Group 754.png";
import strokOne from "@/assets/images/Pattern.png";
import strokTwo from "@/assets/images/Pattern-1.png";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useAppDispatch } from "@/app/store/store";
import { setCurrentCourse } from "@/app/store/slices/allCoursesSlice";

const Page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const t = useTranslations("CoursePage");
  const { locale } = useTranslationContext();

  const { id } = params;
  const {
    data: course,
    error,
    isLoading,
  } = useSWR<getCourse>(`/course/${id}`, getOne, {
    revalidateOnFocus: false,
    onSuccess: (data) => {
      dispatch(setCurrentCourse(data.data));
    },
  });

  const dispatch = useAppDispatch();

  console.log("Ahmed course", course);

  React.useEffect(() => {
    // Access the root element
    const root = document.documentElement;

    // Set CSS variables
    root.style.setProperty(
      "--main-color",
      course?.data.primary_color as string
    );
    root.style.setProperty(
      "--plyr-color-main",
      course?.data.primary_color as string
    );

    // Optionally, clean up the changes when the component unmounts
    return () => {
      root.style.removeProperty("--main-color");
    };
  }, [course?.data]); // Empty dependency array means this runs once on mount

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span style={{ marginInline: 16 }}>{t("AboutCourse")}</span>,
      children: (
        <div>
          <h2 className="color-primary font-[pnu] w-fit text-2xl font-bold leading-8 mt-8 ">
            {t("AboutCourse")}
          </h2>
          <p className="w-full max-w-full mt-4 text-[#656565] font-[pnu] text-base font-normal leading-[160%]">
            {locale == "ar"
              ? course?.data?.description_ar
              : course?.data?.description_en}
            {/* <span className="text-blue-500 font-bold cursor-pointer">
              {t("ReadMore")}
            </span> */}
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: t("AboutInstructor"),
      children: (
        <div>
          <h2 className="color-primary font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            {t("AboutInstructor")}
          </h2>
          <p className="w-[701px] max-w-full mt-4 text-[#656565] font-[pnu] text-base font-normal leading-[160%]">
            {t("AboutInstructorText")}
          </p>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="default" indicator={<LoadingOutlined spin />} />
        <p>{t("Loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>
          {t("Error")}: {error?.message}
        </p>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: course?.data?.primary_color,
        },
      }}
    >
      <div className="flex gap-7 flex-wrap w-full relative mt-6">
        <Image
          src={strokGroup}
          alt="stroke"
          width={800}
          height={800}
          className="fixed z-10 top-0 pointer-events-none right-0 w-[900px]"
        />
        <Image
          src={strokOne}
          alt="stroke"
          width={800}
          height={800}
          className="fixed z-10 top-40 pointer-events-none  left-[268px] w-[180px]"
        />
        <Image
          src={strokTwo}
          alt="stroke"
          width={800}
          height={800}
          className="fixed top-12 z-10 pointer-events-none left-[176px] w-[180px]"
        />
        <RightSideCourseComp course={course?.data as SubscribedCourse} />
        <LeftSideCourseComp
          course={course?.data as SubscribedCourse}
          items={items}
          onChange={() => {
            console.log("changed");
          }}
        />
      </div>
    </ConfigProvider>
  );
};

export default Page;
