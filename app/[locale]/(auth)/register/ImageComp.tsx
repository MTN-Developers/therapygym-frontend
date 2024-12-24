"use client";
import Image from "next/image";
// import loginBannerMob from "@/assets/images/login-banner-mob.png";
import loginBanner from "@/assets/images/login-banner.png";
const ImageComp = () => {
  return (
    <>
      <div className="hidden lg:flex items-center">
        <Image
          src={loginBanner}
          width={683}
          height={700}
          alt="banner image"
          className="w-auto object-cover hidden lg:block h-screen"
        />
        {/* <Image
          src={loginBannerMob}
          alt="banner mob"
          className="w-full lg:hidden"
        /> */}
      </div>
    </>
  );
};

export default ImageComp;
