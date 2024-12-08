"use client";

import Image from "next/image";
import React from "react";

const NotFoundComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        gap: "48px",
      }}
    >
      <Image
        src={"/images/404.svg"}
        width={684}
        height={437}
        alt=""
        style={{
          width: "684.16px",
          height: "437.08px",
          maxWidth: "100%",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <h1
          style={{
            fontFamily: "Cairo",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "48px",
            lineHeight: "72px",
            color: "#5D5D5D",
            textAlign: "center",
          }}
        >
          هذة الصفحة غير موجودة
        </h1>
        <p
          style={{
            fontFamily: "Cairo",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "24px",
            lineHeight: "36px",
            color: "#5D5D5D",
            textAlign: "center",
          }}
        >
          يبدو انك قمت بالوصول الى صفحة غير موجودة
        </p>
      </div>
    </div>
  );
};

export default NotFoundComponent;
