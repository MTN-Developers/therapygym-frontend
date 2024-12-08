"use client";
import React from "react";
import MainHome from "@/app/components/mainHome/MainHome";

import useAxiosInterceptors from "@/app/hooks/useAxiosInterceptors";

export default function Home() {
  useAxiosInterceptors();

  return (
    <div>
      <MainHome />
    </div>
  );
}
