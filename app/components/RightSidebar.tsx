import Image from "next/image";
import React from "react";
import userPhoto from "./../../assets/images/user-photo.svg";
import CoursesCalender from "./CoursesCalendar";

const RightSidebar = () => {
  return (
    <div className="hidden  rounded-2xl lg:flex flex-col px-2 gap-3 py-2 shadow-md">
      <div className="flex flex-col items-center content-center">
        <Image
          src={userPhoto}
          alt="user photo"
          width={70}
          height={70}
          className="shadow-sm"
        />
        <h2 className="font-bold text-[#4d4d4d] text-[18px] ">Nour Omar</h2>
        <p className="text-[12px] text-[#4d4d4d] font-[500]">Client</p>
      </div>
      <CoursesCalender />
    </div>
  );
};

export default RightSidebar;
