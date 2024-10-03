import Image from "next/image";
import React from "react";
import arrowIcon from "../../assets/images/arrow-icon.svg";
import Link from "next/link";

const UpcomingEvents = () => {
  return (
    <div className="shadow-md rounded-lg p-2 flex flex-col gap-y-3">
      <h1 className="text-[18px] font-[500] text-center text-gray-500 ">
        Upcoming Events
      </h1>
      <div className="flex justify-between items-center border border-gray-100 rounded-md py-1 px-2">
        <div className="flex gap-2 items-center">
          <span className="w-[35px] h-[35px] bg-[#c8e0fd] rounded-lg flex content-center items-center font-bold justify-center text-gray-500">
            3
          </span>
          <div>
            <h2 className="font-bold text-gray-500">living Fitra</h2>
            <p>3/03 - 9:00h</p>
          </div>
        </div>
        <div className="cursor-pointer">
          <Image src={arrowIcon} alt="next" />
        </div>
      </div>
      <div className="flex justify-between items-center border border-gray-100 rounded-md py-1 px-2">
        <div className="flex gap-2 items-center">
          <span className="w-[35px] h-[35px] bg-[#c8e0fd] rounded-lg flex content-center items-center justify-center font-bold text-gray-500">
            7
          </span>
          <div>
            <h2 className="font-bold text-gray-500">Leadership</h2>
            <p>3/03 - 9:00h</p>
          </div>
        </div>
        <div className="cursor-pointer">
          <Image src={arrowIcon} alt="next" />
        </div>
      </div>
      <div className="flex justify-between items-center border border-gray-100 rounded-md py-1 px-2">
        <div className="flex gap-2 items-center">
          <span className="w-[35px] h-[35px] bg-[#dacdff] rounded-lg flex content-center items-center justify-center font-bold text-gray-500">
            11
          </span>
          <div>
            <h2 className="font-bold text-gray-500">pregnancy</h2>
            <p>3/03 - 9:00h</p>
          </div>
        </div>
        <div className="cursor-pointer">
          <Image src={arrowIcon} alt="next" />
        </div>
      </div>
      <Link href={"/all-courses"} className="text-center underline font-[500]">
        see more
      </Link>
    </div>
  );
};

export default UpcomingEvents;
