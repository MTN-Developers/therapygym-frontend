"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CoursesSlider = () => {
  const courses = [
    {
      key: 1,
      title: "Course one",
      status: "In Progress",
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
      title: "Course four",
      status: "In Progress",
      finished: false,
    },
    // Add more courses as needed
  ];

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold text-[#5d5d5d] py-4">My Courses</h1>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {courses.map((course) => (
          <SwiperSlide key={course.key}>
            <div className="relative w-full h-[366px] bg-gradient-to-b from-[#9cd8fe] to-[#2983ee] p-4 rounded-lg">
              <span
                className={`absolute text-sm ${
                  course.finished ? "text-green-400" : "text-gray-900"
                } bg-[#ffffff] top-2 left-2 px-4 py-1 rounded-xl`}
              >
                {course.status}
              </span>
              <h2 className="text-white text-xl font-semibold mt-8">
                {course.title}
              </h2>
              {/* Add more content as needed */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoursesSlider;
