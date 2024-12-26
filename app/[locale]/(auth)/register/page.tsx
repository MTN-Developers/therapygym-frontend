"use client";

import React from "react";

import FromComp from "@/app/components/auth/register/FormComp";
import ImageComp from "./ImageComp";

const RegisterPage = () => {
  return (
    <div className="w-full min-h-screen  h-fit  flex items-center justify-center">
      <div className="w-full min-h-[100vh] rounded-3xl flex flex-col-reverse lg:flex lg:flex-row-reverse lg:justify-between">
        <FromComp />
        <ImageComp />
      </div>
    </div>
  );
};

export default RegisterPage;
