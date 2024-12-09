"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.svg";
import shareIcon from "@/assets/images/Square Share Line.png";
import MenuIcon from "@/assets/images/menu.svg";
import { IVideo } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useTranslationContext } from "@/contexts/TranslationContext";
import ChangeLanguage from "../shared/ChangeLanguage";

interface IProps {
  video: IVideo | null;
  handleToggleSidebar: () => void;
}

const HeaderClassRoom = ({ video, handleToggleSidebar }: IProps) => {
  const router = useRouter();
  const { locale } = useTranslationContext();
  //handlers
  const handleGoHome = () => {
    router.push("/");
    router.refresh();
  };

  return (
    <div
      className={`flex justify-between flex-row-reverse items-center lg:px-[48px] px-4 w-full py-4 text-white font-[pnu] bg-[#424242]`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt="logo"
          onClick={handleGoHome}
          className="cursor-pointer"
        />
        <ChangeLanguage />
      </div>
      <div className="flex items-center">
        <Image
          src={MenuIcon}
          alt="logo"
          width={24}
          height={24}
          className="w-6 h-6 cursor-pointer"
          onClick={handleToggleSidebar}
        />
        <p className="mx-6">
          {locale == "ar" ? video?.title_ar : video?.title_en}{" "}
        </p>
        <Image
          src={shareIcon}
          alt="logo"
          width={24}
          height={24}
          className="w-6 h-6 mx-4 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default HeaderClassRoom;
