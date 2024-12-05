"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import loginBanner from "../../../assets/images/login-banner.jpg";
import loginBannerMob from "../../../assets/images/login-banner-mob.png";
import { Button, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import lockIcon from "../../../assets/images/lock-icon.svg";
import { login } from "@/app/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import facebook from "@/assets/images/facebook.svg";
import twitter from "@/assets/images/twitter.svg";
import google from "@/assets/images/google.svg";

import { setCookie } from "cookies-next";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
        router.push("/dashboard"); // Redirect to dashboard or home page
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
      <div className="w-full h-full rounded-3xl flex flex-col-reverse lg:flex lg:flex-row-reverse lg:gap-[58px] lg:justify-between ">
        <div className="flex items-center justify-start flex-1 ">
          <form
            onSubmit={handleSubmit}
            className="  flex flex-col mx-auto lg:mx-0 lg:items-start justify-center gap-y-4"
          >
            <div>
              <h1 className="hidden lg:block text-[#0573F6]   [leading-trim:both] [text-edge:cap] [font-family:'Smooch_Sans']    text-[120px] font-bold leading-[normal]">
                Welcome
              </h1>
              <p className="hidden lg:block relative bottom-4 text-start text-gray-600">
                We are glad to see you back with us
              </p>
            </div>
            <Input
              className="w-[280px] lg:w-[590px] h-[52px] "
              size="large"
              placeholder="Email"
              prefix={<UserOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              size="large"
              className="w-[280px] lg:w-[590px] h-[52px]"
              placeholder="Password"
              prefix={
                <Image src={lockIcon} alt="lock-icon" width={14} height={14} />
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="primary"
              size="large"
              className=" w-[280px] lg:w-[590px] mb-10 h-[52px]"
              htmlType="submit"
              loading={loading}
            >
              Login
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
              I don’t have an account |{" "}
              <span className="text-blue-500 underline ">Signup</span>
            </Link>
          </form>
        </div>
        <div className="flex  items-center  ">
          <Image
            src={loginBanner}
            width={683}
            height={700}
            alt="banner image"
            className="w-full object-cover hidden lg:block lg:h-full"
          />
          <Image
            src={loginBannerMob}
            alt="banner mob"
            className="w-full lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
