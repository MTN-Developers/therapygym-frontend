"use client";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { getOne } from "@/services/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const PaymentInvoice = ({ packageData }: { packageData: course_package }) => {
  const t = useTranslations("PaymentInvoice");
  const { locale } = useTranslationContext();
  const StripeNumber =
    Number(packageData?.price_after_discount) === 0
      ? Number(packageData?.original_price)
      : Number(packageData?.price_after_discount);

  const calculatedGatewayFees = StripeNumber * 0.05;

  const { data: course } = useSWR<getCourse>(
    `/course/${packageData?.course_id}`,
    getOne
  );

  return (
    <div
      style={{
        background: "rgb(245 248 251 / 59%)",
      }}
      className="w-full m-auto rounded-2xl !font-[Cairo] h-full lg:w-[432px] max-w-full p-4 lg:p-10 shrink-0"
    >
      <div
        id="course-info"
        className="flex-col lg:flex-row w-full mb-6 min-h-[108px] h-fit shrink-0 [background:#FFF] rounded-2xl py-[10px] px-[10px] flex items-center gap-[13px]"
      >
        <div className="w-[114px] courseImg h-[88px] flex items-center justify-center shrink-0 [background:#F5F7F9] rounded-md">
          <Image
            src={
              locale == "ar"
                ? (course?.data?.logo_ar as string)
                : (course?.data?.logo_en as string)
            }
            width={96}
            height={40}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-fit text-[#2B2B2B] [font-family:Inter] text-base font-medium">
            {locale == "ar" ? course?.data?.name_ar : course?.data?.name_en}
            {/* {packageData?.name_ar ? ` - ${packageData?.name_ar}` : ""} */}
            {packageData?.name_ar
              ? ` - ${
                  locale == "ar" ? packageData?.name_ar : packageData?.name_en
                }`
              : ""}
          </div>
        </div>
      </div>

      <div
        id="calculations"
        className="w-full min-h-[178px] mt-7 h-fit p-[15px] shrink-0 [background:#FFF] rounded-[10px]"
      >
        <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
          {t("PaymentDetails")}
        </p>
        <div className="w-full h-px [background:#E7E9EB] mt-2 mb-4"></div>
        <div className="flex flex-col gap-[13px] w-full">
          <div className="w-full flex flex-row flex-wrap justify-between items-start lg:items-center">
            <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              {t("SubscriptionPrice")}
            </p>
            <div className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              ${packageData?.original_price}
            </div>
          </div>
          <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center">
            <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              {t("Discount")}
            </p>
            <div className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              ${" "}
              {Number(packageData?.price_after_discount) === 0
                ? "0"
                : Number(packageData?.original_price) -
                  Number(packageData?.price_after_discount)}
            </div>
          </div>
          <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center">
            <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              {t("PriceAfterDiscount")}
            </p>
            <div className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              $
              {Number(packageData?.price_after_discount) === 0
                ? Number(packageData?.original_price)
                : Number(packageData?.price_after_discount)}
            </div>
          </div>
          <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center">
            <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              {t("GatewayFees")}
            </p>
            <div className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              ${calculatedGatewayFees}
            </div>
          </div>
        </div>
        <div className="w-full h-px [background:#E7E9EB] mt-[26px] mb-2"></div>
        <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center">
          <p className="text-[#696969] [font-family:Inter] text-base font-semibold leading-[normal]">
            {t("Total")}
          </p>
          <div className="text-[#000] font-bold [font-family:Inter] text-base leading-[normal]">
            ${StripeNumber + calculatedGatewayFees}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoice;
