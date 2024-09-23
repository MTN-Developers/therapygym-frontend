"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CoursesSlider = () => {
  const courses = [
    {
      key: 1,
      title: "Course one",
      status: "Inprogress",
      finished: false,
    },
    {
      key: 2,
      title: "Course two",
      status: "Complete",
      finished: true,
    },
    {
      key: 3,
      title: "Course three",
      status: "New",
      finished: false,
    },
    {
      key: 4,
      title: "Course three",
      status: "Inprogress",
      finished: false,
    },
  ];

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold text-[#5d5d5d] py-4">My Courses</h1>
      <div>
        <Swiper
          spaceBetween={1}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {courses.map((course) => (
            <SwiperSlide key={course.key}>
              <div className="relative w-[272px] h-[366px] bg-gradient-to-b from-[#9cd8fe] to-[#2983ee] p-4 rounded-lg">
                <span
                  className={`absolute text-sm ${
                    course.finished ? "text-green-400" : "text-gray-900"
                  } bg-[#ffffff] top-2 left-2 px-4  rounded-xl`}
                >
                  {course.status}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CoursesSlider;
