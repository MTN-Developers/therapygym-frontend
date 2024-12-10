"use client";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
// import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spin size="large" indicator={<LoadingOutlined />} />
    </div>
  );
};

export default loading;
