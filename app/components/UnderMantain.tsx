"use client";

import Image from "next/image";
import React from "react";

import underMaintain from "@/assets/images/under-mantain.jpg";

const UnderMaintain = () => {
  return (
    <div className="w-[80vw] h-[80vh] flex items-center justify-center text-center  ">
      <Image src={underMaintain} className="w-[500px]" alt="waiting" />
    </div>
  );
};

export default UnderMaintain;
