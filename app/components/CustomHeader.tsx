"use client";
import React, { useState } from "react";
import Image from "next/image";
import SearchIcon from "../../assets/images/search-icon.svg";
import billIcon from "../../assets/images/bill-icon.svg";
import messageIcon from "../../assets/images/message-icon.svg";

export default function CustomHeader() {
  const [search, setSearch] = useState("");

  // Derived state for showing the search icon
  const showSearchIcon = search.trim() === "";

  // # handlers
  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
  }
  // # end handlers

  return (
    <div className="flex justify-between ps-10 lg:ps-0">
      <div className="relative  rounded-lg">
        <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-blue-500 flex items-center">
          {showSearchIcon && (
            <Image src={SearchIcon} alt="search" width={15} height={15} />
          )}
        </div>
        <input
          name="search"
          value={search}
          onChange={(e) => handleSearchInput(e)}
          type="search"
          placeholder="Search Courses Here"
          aria-label="Search Courses"
          className="w-[150px] lg:w-[357px] h-[46px] shadow-md  px-4 bg-gradient-to-r from-[#f9f9f9] to-[#f9f9f9] rounded-lg text-blue-700 focus:outline-none focus:border-blue-500 transition-colors duration-300 pr-10"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex cursor-pointer content-center justify-center rounded-xl shadow-md w-[36px] h-[36px]">
          <Image src={billIcon} alt="bill" width={20} height={20} />
        </div>
        <div className="flex cursor-pointer content-center justify-center rounded-xl shadow-md w-[36px] h-[36px]">
          <Image src={messageIcon} alt="message" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
