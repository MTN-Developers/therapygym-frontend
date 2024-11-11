"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Spin } from "antd";
import { Course } from "@/interfaces"; // Ensure this interface is imported
import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../store/store";
// import { useEffect } from "react";
// import { fetchSubscribedCourses } from "../store/slices/subscribedCoursesSlice";
import starIcon from "@/assets/images/Star 5.svg";
import useSubscribedCourses from "../hooks/useSubscribedCourses";

const CoursesSlider = () => {
  const { data: courses, error, isLoading } = useSubscribedCourses();

  // const dispatch = useDispatch<AppDispatch>();

  // const {
  //   courses,
  //   loading: isLoading,
  //   error,
  // } = useSelector((state: RootState) => state.subscribedCourses);

  // useEffect(() => {
  //   if (courses.length === 0 && !isLoading && !error) {
  //     dispatch(fetchSubscribedCourses());
  //   }
  // }, [dispatch, courses.length, isLoading, error]);

  // console.log("CoursesSlider initialized", courses);

  return (
    <div className="mt-5">
      <h1 className="text-3xl font-bold font-poppins text-[#5d5d5d] py-4">
        My Courses
      </h1>
      {error && (
        <div className="">
          <h1 className="text-xl font-bold text-[#5d5d5d] py-4">Error.</h1>
        </div>
      )}
      {isLoading && (
        <>
          <div className="w-full pt-20 flex justify-center ">
            <Spin size="large" />
          </div>
        </>
      )}
      {!courses && !isLoading && (
        <h1 className="text-xl font-bold text-[#5d5d5d] py-4">
          No courses found. Please subscribe to some courses to see them here.
        </h1>
      )}
      {courses?.length > 0 && (
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {courses.map((course: Course) => (
            <SwiperSlide key={course.id}>
              <div
                dir="rtl"
                className="relative flex flex-col items-center  shadow-xl mb-10 mx-4  w-full h-[366px] bg-gray-50  rounded-lg"
              >
                {/* Add more content as needed */}
                <div className=" flex justify-center w-full bg-white rounded-t-lg  ">
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
                    <Image src={starIcon} alt="star" width={20} height={20} />
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
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CoursesSlider;
