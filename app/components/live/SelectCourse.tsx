"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Spin, Tooltip } from "antd";
import Image from "next/image";
import useSWR from "swr";
import { getOne } from "@/services/server";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";
import React from "react";
const SelectCourse = () => {
  const {
    data: courses,
    error,
    isLoading,
  } = useSWR<getCourses>("/course?limit=1000", getOne);

  const MyCourses = React.useMemo(() => {
    const my_courses = courses?.data?.data?.filter((course) => {
      const match =
        (course.status?.isSubscribed || course.status?.isPurchased) &&
        course.has_live &&
        course.status?.isSubscriptionValid;
      console.log(course.name_en, match);
      return match;
    });
    return my_courses || [];
  }, [courses?.data?.data]);

  console.log({ MyCourses });
  const t = useTranslations("Home");
  const { locale } = useTranslationContext();
  return (
    <div className="mt-5 w-full">
      {error && (
        <div className="">
          <h1 className="text-xl font-bold text-[#5d5d5d] py-4">
            {t("ErrorMsg")}
          </h1>
        </div>
      )}
      {isLoading && (
        <>
          <div className="w-full pt-20 flex justify-center ">
            <Spin size="large" />
          </div>
        </>
      )}
      {!MyCourses.length && !isLoading && (
        <h1 className="text-xl font-bold text-[#5d5d5d] py-4">
          {t("YouDon'tHaveCourses")}
        </h1>
      )}
      {courses && MyCourses?.length > 0 && (
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
          className="w-full h-fit"
        >
          {MyCourses?.map((course, idx) => (
            <SwiperSlide key={idx} className="!w-[217px]">
              <Link
                href={`/live-stream/${course.id}`}
                className="relative flex flex-col items-center cursor-pointer shadow-none w-full h-[260px] bg-gray-50  rounded-lg"
              >
                <div className=" flex justify-center w-full bg-white rounded-t-lg  ">
                  <Image
                    src={course.banner_ar ?? ""}
                    width={217}
                    height={150}
                    alt="course image"
                    className="w-[217px] h-[150px] object-cover rounded-t-lg"
                  />
                </div>
                <div className="w-full p-2">
                  <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                    {course.category || "Course Status"}
                  </h2>
                  <Tooltip
                    title={locale == "ar" ? course.name_ar : course.name_en}
                  >
                    <h2 className=" text-[#353535] text-start font-[pnu]  text-base font-bold mb-2 leading-[160%]">
                      {locale == "ar" ? course.name_ar : course.name_en}
                    </h2>
                  </Tooltip>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default SelectCourse;
