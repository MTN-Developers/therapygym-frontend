/* eslint-disable no-unused-vars */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import SearchIcon from "../../assets/images/search-icon.svg";
import { useTranslationContext } from "@/contexts/TranslationContext";
import ChangeLanguage from "./shared/ChangeLanguage";
import { useTranslations } from "next-intl";
import { Dropdown } from "antd";
import useSWR from "swr";
import { getOne } from "@/services/server";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
import MessageIcon from "@/assets/svgs/message-icon";
import { RootState, useAppSelector } from "../store/store";
import MenuIcon from "@/assets/svgs/MenuIcon";
import BillIcon from "@/assets/svgs/BillIcon";
// import { useSelector } from "react-redux";

export default function CustomHeader({
  setCollapsed,
}: {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [search, setSearch] = useState("");
  const { locale } = useTranslationContext();
  const t = useTranslations("Header");
  const { data } = useSWR<getUserProfile>("/user/me", getOne);
  const logout_T = useTranslations("Logout");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const handleLogOut = () => {
    dispatch(logout());
    router.push("/login");
  };

  console.log("path", pathname);

  // Derived state for showing the search icon
  const showSearchIcon = search.trim() === "";

  // # handlers
  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
  }

   function CourseIdExisted() {
    let pathArr = pathname.split("/");
    let courseId = pathArr[pathArr.length - 1];
    if (courseId.length > 10) {
      return currentCourse?.primary_color;
    }

    return "#0573F6";
  }

  const useSelector = useAppSelector;
  const { currentCourse } = useSelector((state) => state.allCourses);
  const { userData } = useSelector((state: RootState) => state.userProfile);
  // # end handlers

  return (
    <div
      className={`flex justify-between gap-4 px-1 ${
        pathname.startsWith(`/${locale}/profile`)
          ? locale == "ar"
            ? "pr-6"
            : "pl-6"
          : ""
      } 
    `}
    >
      <div
        onClick={() => setCollapsed((prev: boolean) => !prev)}
        className="relative flex items-center gap-2 rounded-lg"
      >
        <MenuIcon color={CourseIdExisted()} />
        <div
          className={`absolute 
            ${locale == "ar" ? "left-5" : "right-5"}
             top-1/2 transform -translate-y-1/2 text-blue-500  hidden lg:flex items-center`}
        >
          {showSearchIcon && (
            <Image src={SearchIcon} alt="search" width={15} height={15} />
          )}
        </div>
        <input
          name="search"
          value={search}
          onChange={(e) => handleSearchInput(e)}
          type="search"
          placeholder={t("SearchCourses")}
          aria-label="Search Courses"
          className="w-[150px] lg:w-[357px] hidden lg:flex relative bottom-1 h-[38px] shadow-md  px-4 bg-gradient-to-r from-[#f9f9f9] to-[#f9f9f9] rounded-lg text-blue-700 focus:outline-none focus:border-blue-500 transition-colors duration-300 pr-10"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex cursor-pointer items-center content-center justify-center rounded-xl shadow-md w-[36px] h-[36px]">
          {/* <Image src={billIcon} alt="bill" width={20} height={20} /> */}
          <BillIcon color={CourseIdExisted()} />
        </div>
        <div className="flex items-center cursor-pointer content-center justify-center rounded-xl shadow-md w-[36px] h-[36px]">
          <Dropdown
            menu={{
              items: [
                { key: "1", label: "You Don't have any messages till now" },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <MessageIcon color={CourseIdExisted()} />
            {/* <Image src={messageIcon} alt="message" width={20} height={20} /> */}
          </Dropdown>
        </div>

        <ChangeLanguage />
        {/* <div className="flex cursor-pointer content-center justify-center rounded-xl shadow-md w-[36px] h-[36px]"> */}
        <div
          className={`flex cursor-pointer content-center justify-center rounded-xl shadow-md w-[36px] h-[36px] `}
        >
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: `${logout_T("Logout")}`,
                  onClick: () => handleLogOut(),
                  style: {
                    fontFamily: locale == "ar" ? "Cairo" : "Inter",
                  },
                },
              ],
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Image
              src={
                userData?.profile?.avatar
                  ? userData?.profile?.avatar
                  : userData?.gender == "male"
                  ? "/images/male.jpg"
                  : "/images/female.jpg"
              }
              className="rounded-full  !w-[40px] !h-[40px] object-cover"
              alt="user photo"
              width={35}
              height={35}
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
