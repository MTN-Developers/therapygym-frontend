"use client";

import { Spin } from "antd";
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";

import { useCourses } from "@/app/hooks/useCourses";
// import CustomHeader from "@/app/components/CustomHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Course } from "@/interfaces";
import Image from "next/image";
import starIcon from "@/assets/images/Star 5.svg";
import Link from "next/link";

// const { Meta } = Card;

const Page = () => {
  // const {
  //   courses,
  //   error: isError,
  //   loading: isLoading,
  // } = useSelector((state: RootState) => state.allCourses);
  // const dispatch = useDispatch<AppDispatch>();

  const { data: courses, isLoading, isError } = useCourses();

  // useEffect(() => {
  //   if (courses.length === 0 && !isLoading && !isError) {
  //     dispatch(fetchAllCourses());
  //   }
  // }, [dispatch, courses, isLoading, isError]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return (
    <main
      style={{ background: "#fff", padding: 24, minHeight: "100%" }}
      className="font-[pnu]"
    >
      {/* <CustomHeader /> */}
      <div dir="rtl" className="flex flex-col gap-10">
        <div className="w-full my-4 ">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[#15162C] text-center text-2xl font-bold leading-8 tracking-[-0.24px]">
              كوسات القيادة الفعالة
            </h1>
            <span className="text-[#164194] text-center cursor-pointer text-base font-normal leading-8 tracking-[-0.16px]">
              عرض الكل
            </span>
          </div>
          <div>
            <Swiper
              spaceBetween={16}
              slidesPerView={5}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 5 },
              }}
            >
              {courses?.map((course: Course) => (
                <SwiperSlide key={course.id}>
                  <Link href={`/dashboard/course/${course.id}`}>
                    <div
                      dir="rtl"
                      className="relative flex flex-col items-center  shadow-lg mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                    >
                      {/* Add more content as needed */}
                      <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                        <Image
                          src={course.logo}
                          width={217}
                          height={150}
                          alt="course image"
                          className="w-[217px] h-[150px]"
                        />
                      </div>
                      <div className="w-full p-2">
                        <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                          {course.title || "Course Status"}
                        </h2>
                        <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                          تقنية الاتزان العاطفي
                        </h2>
                        <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                          دكتور أحمد الدملاوى
                        </p>
                        <div className="flex gap-2 mb-4 items-center justify-start">
                          <Image
                            src={starIcon}
                            alt="star"
                            width={20}
                            height={20}
                          />
                          <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                            <span className="font-bold text-[#2d5482] ">
                              4.2
                            </span>{" "}
                            (Over 12500)
                          </p>
                        </div>
                        <p className="flex gap-3 text-xl">
                          <span className="font-bold">$3000</span>
                          <span className="line-through">$5000</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-lg mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="w-full my-4 ">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[#15162C] text-center text-2xl font-bold leading-8 tracking-[-0.24px]">
              كورسات التشافي الذاتي{" "}
            </h1>
            <span className="text-[#164194] text-center cursor-pointer text-base font-normal leading-8 tracking-[-0.16px]">
              عرض الكل
            </span>
          </div>
          <div>
            <Swiper
              spaceBetween={16}
              slidesPerView={5}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 5 },
              }}
            >
              {courses?.map((course: Course) => (
                <SwiperSlide key={course.id}>
                  <Link href={`/dashboard/course/${course.id}`}>
                    <div
                      dir="rtl"
                      className="relative flex flex-col items-center  shadow-lg mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                    >
                      {/* Add more content as needed */}
                      <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                        <Image
                          src={course.logo}
                          width={217}
                          height={150}
                          alt="course image"
                          className="w-[217px] h-[150px]"
                        />
                      </div>
                      <div className="w-full p-2">
                        <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                          {course.title || "Course Status"}
                        </h2>
                        <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                          تقنية الاتزان العاطفي
                        </h2>
                        <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                          دكتور أحمد الدملاوى
                        </p>
                        <div className="flex gap-2 mb-4 items-center justify-start">
                          <Image
                            src={starIcon}
                            alt="star"
                            width={20}
                            height={20}
                          />
                          <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                            <span className="font-bold text-[#2d5482] ">
                              4.2
                            </span>{" "}
                            (Over 12500)
                          </p>
                        </div>
                        <p className="flex gap-3 text-xl">
                          <span className="font-bold">$3000</span>
                          <span className="line-through">$5000</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-lg mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide key={1}>
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
                >
                  {/* Add more content as needed */}
                  <div className=" flex justify-center w-full rounded-t-lg bg-white  ">
                    {/* <Image
                        src={course.logo}
                        width={217}
                        height={150}
                        alt="course image"
                        className="w-[217px] h-[150px]"
                      /> */}
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {"Course Status"}
                    </h2>
                    <h2 className=" text-[#353535] text-start font-[pnu] text-base font-bold mb-2 leading-[160%]">
                      تقنية الاتزان العاطفي
                    </h2>
                    <p className=" text-[color:var(--Neutral-70,#595959)] text-right font-[pnu] text-sm font-normal leading-[160%]">
                      دكتور أحمد الدملاوى
                    </p>
                    <div className="flex gap-2 mb-4 items-center justify-start">
                      {/* <Image
                          src={starIcon}
                          alt="star"
                          width={20}
                          height={20}
                        /> */}
                      <p className="text-[#969696]  text-[14.182px] font-normal leading-[normal]">
                        <span className="font-bold text-[#2d5482] ">4.2</span>{" "}
                        (Over 12500)
                      </p>
                    </div>
                    <p className="flex gap-3 text-xl">
                      <span className="font-bold">$3000</span>
                      <span className="line-through">$5000</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
