"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import loginBanner from "@/assets/images/login-banner.jpg";
import loginBannerMob from "@/assets/images/login-banner-mob.png";
import { Button, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import lockIcon from "@/assets/images/lock-icon.svg";
import { login } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import facebook from "@/assets/images/facebook.svg";
import twitter from "@/assets/images/Twitter.svg";
import google from "@/assets/images/google.svg";

import { setCookie } from "cookies-next";
import Link from "next/link";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useTranslations } from "next-intl";
import ChangeLanguage from "@/app/components/shared/ChangeLanguage";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { locale } = useTranslationContext();
  // console.log(locale);

  const t = useTranslations("Login");

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        message.success("Login successful");
        // Set cookies with appropriate options
        setCookie("access_token", resultAction.payload.access_token, {
          path: "/",
        });
        setCookie("refresh_token", resultAction.payload.refresh_token, {
          path: "/",
        });
        setCookie("user", resultAction.payload.user, { path: "/" });
        router.push("/"); // Redirect to home page
      } else {
        message.error("Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      message.error("An unexpected error occurred");
    }
  };

  return (
    <div className="w-full lg:h-screen ">
      {/* <div className="hidden md:block"> */}
      <div className="z-10 w-full h-full  flex flex-col-reverse lg:flex lg:flex-row-reverse lg:justify-start ">
        <div className="lg:flex relative bottom-[30px] lg:bottom-0 px-4  items-center justify-start flex-1 lg:pl-10 ">
          <form
            onSubmit={handleSubmit}
            className="  flex flex-col mx-auto lg:mx-0 lg:items-start justify-center gap-y-4"
          >
            <div className="flex items-center w-full justify-between">
              <h1
                className={`hidden lg:block text-[#0573F6]   
                  
                  ${locale == "ar" ? "font-['Cairo']" : "font-['Inter']"}
                  text-5xl font-bold leading-[normal]`}
              >
                {t("Welcome")}
              </h1>
              <ChangeLanguage />
            </div>
            <p className="hidden lg:block relative  text-start text-gray-600">
              {t("We are glad to see you back with us")}
            </p>
            <Input
              className="w-full lg:w-[590px] h-[52px] "
              size="large"
              placeholder={t("Email")}
              prefix={<UserOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              size="large"
              className="w-full lg:w-[590px] h-[52px]"
              placeholder={t("Password")}
              prefix={
                <Image src={lockIcon} alt="lock-icon" width={14} height={14} />
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              href={"/request-reset-password"}
              className=" text-gray-500 text-sm text-center  hover:cursor-pointer  hover:text-blue-600 underline"
            >
              {t("Forget Your Password?")}

              <span className="text-blue-500 underline ">
                {t("Reset Password")}
              </span>
            </Link>{" "}
            <Button
              type="primary"
              size="large"
              className=" w-full lg:w-[590px] mb-4 h-[52px]"
              htmlType="submit"
              loading={loading}
            >
              {t("Login")}
            </Button>
            <div className="flex flex-col gap-4 items-center justify-center lg:hidden mb-[20px] ">
              <p className="text-gray-500">or</p>
              <div className="flex items-center justify-center gap-[48px]">
                <Image src={twitter} alt="twitter" />
                <Image src={facebook} alt="facebook" />
                <Image src={google} alt="google" />
              </div>
            </div>
            <Link
              href={"/register"}
              className=" text-gray-500 text-sm text-center  hover:cursor-pointer mb-10 hover:text-blue-600 underline"
            >
              {t("Dont have an account?")} |{" "}
              <span className="text-blue-500 underline ">{t("SignUp")}</span>
            </Link>
          </form>
        </div>
        <Image
          src={loginBanner}
          alt="banner image"
          className="h-screen w-auto object-contain hidden lg:block "
        />
        <Image
          src={loginBannerMob}
          alt="banner mob"
          className="w-full lg:hidden object-cover"
        />
      </div>
    </div>
  );
};

export default Page;
