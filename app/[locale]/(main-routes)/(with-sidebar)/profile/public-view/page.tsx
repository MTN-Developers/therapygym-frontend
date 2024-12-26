"use client";

import { RootState, useAppDispatch } from "@/app/store/store";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import userPhoto from "@/assets/images/user-placeholder.jpg";
import facebook from "@/assets/images/facebook-black.svg";
import twitter from "@/assets/images/twitter-black.svg";
import instagram from "@/assets/images/instagram-black.svg";
import linkedin from "@/assets/images/linkedin-black.svg";
import abstarct from "@/assets/images/🦆 icon _abstract 100_.svg";
import crown from "@/assets/images/🦆 icon _queen crown_.svg";
import heart from "@/assets/images/🦆 icon _heart plus_.svg";
import achievement from "@/assets/images/🦆 icon _achievement_.svg";
import path from "@/assets/images/🦆 icon _path distance_.svg";
import fire from "@/assets/images/🦆 icon _fire_.svg";
import trophy from "@/assets/images/🦆 icon _trophy_.svg";
import three from "@/assets/images/🦆 icon _three friends_.svg";
import { useTranslationContext } from "@/contexts/TranslationContext";
import starIcon from "@/assets/images/Star 5.svg";
import { useTranslations } from "next-intl";
import { Spin, Tabs, TabsProps, Tooltip } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import useSWR from "swr";
import { getOne } from "@/services/server";
import { fetchUserProfile } from "@/app/store/slices/userProfileSlice";

const Page = () => {
  const { userData, error, loading } = useSelector(
    (state: RootState) => state.userProfile
  );
  const dispatch = useAppDispatch();
  // console.log("user is ", userData);

  const t = useTranslations("ProfilePages.PublicPage");

  // const { locale } = useTranslationContext();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span style={{ marginInline: 16, fontWeight: "bold" }}>
          {t("All Courses")}
        </span>
      ),
      children: (
        <div className="px-4">
          <AllCourses />
        </div>
      ),
    },
    {
      key: "2",
      label: t("My Certificates"),
      children: (
        <div className="px-4">
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            {t("My Certificates")}
          </h2>
          <p className="w-full mt-4 text-[#656565]  font-[pnu] text-base font-normal leading-[160%]">
            {t("Empty Certificates")}
          </p>
        </div>
      ),
    },
  ];

  /* effects  */
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className="p-4 w-full">
      {error && <p>{error}</p>}
      {loading && (
        <>
          <Spin />
        </>
      )}

      {userData && (
        <>
          <div className=" w-full lg:w-[1000px] flex items-center justify-between">
            {/* user photo , name and description */}
            <UserInfo userData={userData} />
            {/* Achievements */}
            <div className="hidden md:block">
              <AchievementsComp />
            </div>
          </div>
          <div className=" py-4 w-full font-[pnu] lg:mb-2 z-30">
            <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

const UserInfo = ({ userData }) => {
  /* socials */
  const socialIcons = [
    {
      img: facebook,
    },
    {
      img: twitter,
    },
    {
      img: instagram,
    },
    {
      img: linkedin,
    },
  ];
  return (
    <div className="flex flex-col gap-2 items-start">
      {/* user image */}
      <div className="w-[100px] h-[100px]  shadow-sm rounded-full object-cover ">
        <Image
          src={userData?.profile?.avatar || userPhoto}
          alt={userData?.name}
          width={200}
          height={200}
          className="!w-full h-full object-cover rounded-full"
        />
      </div>
      {/* user name */}
      <div className="flex items-center justify-center gap-4 ">
        <h2 className="text-black text-nowrap [leading-trim:both] [text-edge:cap] [font-family:Poppins] text-base font-semibold leading-[23.583px] tracking-[-0.197px]">
          {userData?.name}
        </h2>
        <div className="block md:hidden ">
          <AchievementsComp />
        </div>
      </div>
      {/* user bio */}
      <p className="lg:max-w-[540px] max-w-[200px]  !text-wrap !overflow-wrap !break-words !leading-6 text-[#636363] [font-family:Poppins] text-base font-normal  ">
        {userData?.profile?.bio}
      </p>
      {/* social icons */}
      <div className="flex items-center gap-4 justify-start  ">
        {socialIcons.map((icon) => (
          <a
            href="#"
            key={icon.img}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <Image
              src={icon.img}
              alt="social icon"
              width={24}
              height={24}
              className="!min-w-6"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

const AchievementsComp = () => {
  const t = useTranslations("ProfilePages.PublicPage");

  const achievementsIcons = [
    {
      img: abstarct,
    },
    {
      img: crown,
    },
    {
      img: heart,
    },
    {
      img: achievement,
    },
    {
      img: path,
    },
    {
      img: fire,
    },
    {
      img: trophy,
    },
    {
      img: three,
    },
  ];
  return (
    <div className="">
      <h2 className="hidden md:block text-black mb-4 [leading-trim:both] [text-edge:cap] [font-family:Poppins] text-base font-semibold leading-[23.583px] tracking-[-0.197px]">
        {t("Achievements")}{" "}
      </h2>
      <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
        {achievementsIcons.map((icon, index) => (
          <div key={index} className="flex items-center gap-2">
            <Image
              src={icon.img}
              alt="achievement icon"
              // width={20}
              // height={20}
              className="!w-[20px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const AllCourses = () => {
  const {
    data: courses,
    error,
    isLoading,
  } = useSWR<getCourses>("/course", getOne);

  // console.log(courses?.data?.data);

  const t = useTranslations("Home");
  const { locale } = useTranslationContext();
  return (
    <div className="mt-5 w-full">
      {/* <h1 className="text-3xl mb-2 font-bold font-poppins text-[#5d5d5d] py-4">
        {t("AllCourses")}
      </h1> */}
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
      {!courses?.data.data.length && !isLoading && (
        <h1 className="text-xl font-bold text-[#5d5d5d] py-4">
          {t("NoCourses")}
        </h1>
      )}
      {courses && courses?.data?.data?.length > 0 && (
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
          className="w-full h-fit"
        >
          {courses?.data?.data?.map((course, idx) => (
            <SwiperSlide key={idx} className="!w-[217px]">
              <Link
                href={`/courses/${course.id}`}
                className="relative flex flex-col mb-6 items-center cursor-pointer shadow-none w-full h-[310px] bg-gray-50  rounded-lg"
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
                  <div className="flex gap-2 mb-4 items-center justify-start">
                    <Image src={starIcon} alt="star" width={20} height={20} />
                    <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                      <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                      (Over 12500)
                    </p>
                  </div>
                  {/* <p className="flex gap-3 text-xl">
                    <span className="font-bold">
                      ${course.price_after_discount}
                    </span>
                    {course.price_after_discount ==
                    course.original_price ? null : (
                      <span className="line-through">
                        ${course.original_price}
                      </span>
                    )}
                  </p> */}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
