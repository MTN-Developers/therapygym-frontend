"use client";
import React from "react";
import MainHome from "@/app/components/mainHome/MainHome";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import SearchPage from "@/app/components/SearchPage";

export default function Home() {
  // useAxiosInterceptors();

  const { searchTerm } = useSelector((state: RootState) => state.searchSlice);

  if (searchTerm) {
    return <SearchPage />;
  }

  return (
    <div>
      <MainHome />
    </div>
  );
}
