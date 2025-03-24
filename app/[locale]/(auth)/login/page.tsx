"use client";
// login page
import Image from "next/image";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import loginBanner from "@/assets/images/login-banner.png";
// import loginBannerMob from "@/assets/images/login-banner-mob.png";
import { Button, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import lockIcon from "@/assets/images/lock-icon.svg";
import { login } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import logoMobile from "@/assets/images/therapy-gym-colored.svg";
// import facebook from "@/assets/images/facebook.svg";
// import twitter from "@/assets/images/Twitter.svg";
// import google from "@/assets/images/google.svg";

import { setCookie } from "cookies-next";
import Link from "next/link";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useTranslations } from "next-intl";
import ChangeLanguage from "@/app/components/shared/ChangeLanguage";
import axiosInstance from "@/app/utils/axiosInstance";
import SocialMediaSection from "@/app/components/auth/register/SocialMediaSection";
import Vectors from "@/app/components/profile/Vectors";
import topRightVector from "@/assets/images/vector-top-right-signup.svg";
import bottomLeftVector from "@/assets/images/vector-bottom-left-signup.svg";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { locale } = useTranslationContext();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const package_id = searchParams.get("package_id");
  const tt = useTranslations("RegisterPage");

  const t = useTranslations("Login");

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      // console.log("resultAction", resultAction);

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

        if (package_id) {
          try {
            const { data } = await axiosInstance.post(
              "/user-compensation-request",
              {
                package_id: package_id,
              }
            );
            console.log(data);
          } catch (e) {
            console.log(e);
          }
        }
        // router.push("/"); // Redirect to home page
        router.replace(`
          ${redirect ? decodeURIComponent(redirect) : "/"}
          `);
      } else {
        message.error(resultAction.payload as string);
      }
    } catch (err) {
      console.error("Login error:", err);
      message.error("An unexpected error occurred");
    }
  };

  return (
    <div className="w-full relative overflow-hidden  h-full lg:h-screen ">
      {/* <div className="hidden md:block"> */}
      <div className="z-10 px-4 lg:px-0 w-full h-full  lg:pt-0 pt-28 flex flex-col-reverse lg:flex lg:flex-row-reverse lg:justify-start ">
        <div className="lg:flex z-20  relative items-center justify-start flex-1 lg:px-20 ">
          <form
            onSubmit={handleSubmit}
            className="  flex flex-col mx-auto lg:mx-0 lg:items-start justify-center gap-y-4"
          >
            <h1 className="text-[#2983EE]  text-3xl font-bold ">
              {t("Login")}
            </h1>
            {/* <h2 className="text-[#353535]  text-sm font-normal ">
              {t("We are glad to see you back with us")}
            </h2> */}
            <div className="flex items-center w-full justify-between">
              <h3
                className={`hidden lg:block text-[#0573F6]   
                  
                  ${locale == "ar" ? "font-['Cairo']" : "font-['Inter']"}
                  text-5xl font-bold leading-[normal]`}
              >
                {t("Welcome")}
              </h3>
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
            {/* <div className="flex flex-col gap-4 items-center justify-center lg:hidden mb-[20px] ">
              <p className="text-gray-500">or</p>
              <div className="flex items-center justify-center gap-[48px]">
                <Image src={twitter} alt="twitter" />
                <Image src={facebook} alt="facebook" />
                <Image src={google} alt="google" />
              </div>
            </div> */}
            <Link
              href={`/register${package_id ? `?package_id=${package_id}` : ""}`}
              className=" text-gray-500 text-sm text-center  hover:cursor-pointer mb-10 hover:text-blue-600 underline"
            >
              {t("Dont have an account?")} |{" "}
              <span className="text-blue-500 underline ">{t("SignUp")}</span>
            </Link>
          </form>
          <SocialMediaSection t={tt} />
          <div className="hidden lg:block">
            <Vectors />
          </div>
        </div>
        <Image
          src={loginBanner}
          alt="banner image"
          className="h-screen w-auto object-contain hidden lg:block "
        />
        <Image
          src={logoMobile}
          alt="banner mob"
          className="w-[90px] block lg:hidden object-cover"
        />
      </div>
      <div className="lg:hidden block">
        <>
          {/* Top Right Vector */}
          <Image
            src={topRightVector}
            alt="vector"
            className={`absolute lg:-top-3 
            ${
              locale === "en" ? "lg:right-0 -right-12" : "lg:right-0 -right-12"
            } 
          
         -top-8`}
            style={{
              transform: locale === "en" ? "scaleX(1)" : " scaleX(1)",
            }}
          />
          <Image
            src={bottomLeftVector}
            alt="vector"
            className="absolute bottom-0 left-0"
          />
        </>
      </div>
    </div>
  );
};

export default Page;
