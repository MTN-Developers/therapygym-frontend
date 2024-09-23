import Image from "next/image";
import React from "react";
import loginBanner from "../../assets/images/login-banner.svg";
import { Button, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import lockIcon from "../../assets/images/lock-icon.svg";

const page = () => {
  return (
    <div className="w-screen h-screen  p-[34px]">
      <div className="w-full h-full  rounded-3xl flex justify-between ">
        <div className=" flex items-center justify-center flex-1">
          <form className=" w-[683px] h-[600px] flex flex-col items-center justify-center gap-y-4">
            <div>
              <h1 className="text-[80px] text-[#0b7cf8] font-[700] font-sans">
                Welcome
              </h1>
              <p className="text-center text-gray-600">
                We are glad to see you back with us
              </p>
            </div>
            <Input
              className="w-[364px]"
              size="large"
              placeholder="Username"
              prefix={<UserOutlined />}
            />
            <Input
              size="large"
              className="w-[364px]"
              placeholder="Password"
              prefix={
                <Image src={lockIcon} alt="lock-icon" width={14} height={14} />
              }
            />
            <Button type="primary" size="large" className="w-[364px]">
              Next
            </Button>
          </form>
        </div>
        <div className=" lg:flex items-center hidden ">
          <Image
            src={loginBanner}
            width={683}
            height={700}
            alt="banner image "
            style={{
              width: "683px",
              height: "600px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
