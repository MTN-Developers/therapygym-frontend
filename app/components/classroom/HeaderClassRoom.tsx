"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.svg";
import shareIcon from "@/assets/images/Square Share Line.png";
import MenuIcon from "@/assets/images/menu.svg";
import { IVideo } from "@/interfaces";
import { useRouter } from "next/navigation";

interface IProps {
  video: IVideo | null;
  handleToggleSidebar: () => void;
}

const HeaderClassRoom = ({ video, handleToggleSidebar }: IProps) => {
  const router = useRouter();

  //handlers
  const handleGoHome = () => {
    router.push("/");
    router.refresh();
  };

  return (
    <div className=" flex justify-between items-center lg:px-[48px] w-full py-4 text-white font-[pnu] bg-[#424242]">
      <Image
        src={logo}
        alt="logo"
        onClick={handleGoHome}
        className="cursor-pointer"
      />
      <div className="flex items-center">
        <p className="mx-6">{video?.title} </p>
        <Image
          src={shareIcon}
          alt="logo"
          width={24}
          height={24}
          className="w-6 h-6 mx-4 cursor-pointer"
        />
        <Image
          src={MenuIcon}
          alt="logo"
          width={24}
          height={24}
          className="w-6 h-6 cursor-pointer"
          onClick={handleToggleSidebar}
        />
      </div>
    </div>
  );
};

export default HeaderClassRoom;
