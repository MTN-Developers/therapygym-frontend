"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Spin, Tooltip } from "antd";
import Image from "next/image";
import starIcon from "@/assets/images/Star 5.svg";
// import useSubscribedCourses from "../hooks/useSubscribedCourses";
import useSWR from "swr";
import { getOne } from "@/services/server";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";
import React from "react";
const MyCourses = () => {
  const {
    data: courses,
    error,
    isLoading,
  } = useSWR<getCourses>("/course", getOne);

  const MyCourses = React.useMemo(() => {
    const my_courses = courses?.data?.data?.filter(
      (courses) => courses.status?.isSubscribed || courses.status?.isPurchased
    );
    return my_courses || [];
  }, [courses?.data?.data]);

  const t = useTranslations("Home");
  const { locale } = useTranslationContext();
  return (
    <div className="mt-5 w-full">
      <h1 className="text-3xl mb-2 font-bold font-poppins text-[#5d5d5d] py-4">
        {t("MyCourses")}
      </h1>
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
                href={`/courses/${course.id}`}
                className="relative flex flex-col items-center cursor-pointer shadow-none w-full h-[310px] bg-gray-50  rounded-lg"
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
                    <h2 className=" text-[#353535] text-start font-[pnu] truncate text-base font-bold mb-2 leading-[160%]">
                      {locale == "ar" ? course.name_ar : course.name_en}
                    </h2>
                  </Tooltip>
                  {/* <p className=" text-[color:var(--Neutral-70,#595959)]  font-[pnu] text-sm font-normal leading-[160%]">
                    دكتور أحمد الدملاوى
                  </p> */}
                  <div className="flex gap-2 mb-4 items-center justify-start">
                    <Image src={starIcon} alt="star" width={20} height={20} />
                    <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                      <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                      (Over 12500)
                    </p>
                  </div>
                  <p className="flex gap-3 text-xl">
                    <span className="font-bold">
                      ${course.price_after_discount}
                    </span>
                    <span className="line-through">
                      ${course.original_price}
                    </span>
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MyCourses;
