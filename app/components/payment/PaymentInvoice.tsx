"use client";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { getOne } from "@/services/server";
// import { Course_package } from "@/types/packages";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import { RenderHTML } from "../shared/RenderHTML";
import PromoCodeForm from "./PromoCodeForm";
import { useAppSelector } from "@/app/store/store";
import { Tooltip } from "antd";
import { IoMdClose } from "react-icons/io";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Package } from "@/types/publicCoursePackages";

interface PromoCode {
  code: string;
  discount_percentage: number;
}

const PaymentInvoice = ({
  packageData,
  promoCodeList,
  setPromoCodeList,
  courseId,
}: {
  packageData: Package;
  promoCodeList: PromoCode[];
  setPromoCodeList: any;
  courseId: string;
}) => {
  const t = useTranslations("PaymentInvoice");
  const { locale } = useTranslationContext();
  const StripeNumber =
    Number(packageData?.price_after_discount) === 0
      ? Number(packageData?.original_price)
      : Number(packageData?.price_after_discount);

  const [calculatedGatewayFees, setGatewayFees] = React.useState(
    StripeNumber * 0.05
  );
  const [total, setTotal] = React.useState(
    StripeNumber + calculatedGatewayFees
  );
  const [_subtotal, setSubTotal] = React.useState(
    total - calculatedGatewayFees
  );

  console.log("courseId", courseId);

  const { userData } = useAppSelector((state) => state.userProfile);
  const { data: course } = useSWR<getCourse>(`/course/${courseId}`, getOne);

  const handleRemovePromoCode = (promo: PromoCode, index: number) => {
    // Remove promo code from list
    setPromoCodeList((prev) => prev.filter((_, i) => i !== index));

    // Reset to original values
    const basePrice =
      Number(packageData?.price_after_discount) === 0
        ? Number(packageData?.original_price)
        : Number(packageData?.price_after_discount);

    const newGatewayFees = basePrice * 0.05;
    setGatewayFees(newGatewayFees);
    setTotal(basePrice + newGatewayFees);
  };

  // Calculate discount amount if promo code exists
  const activePromoCode = promoCodeList[0];
  // const subtotal =
  const discountAmount = activePromoCode
    ? (Number(packageData?.price_after_discount) === 0
        ? Number(packageData?.original_price)
        : Number(packageData?.price_after_discount) *
          activePromoCode.discount_percentage) / 100
    : 0;

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
            {locale == "ar" ? (
              <RenderHTML
                htmlContent={packageData?.name_ar}
                renderInTable={false}
              />
            ) : (
              <RenderHTML
                htmlContent={packageData?.name_en}
                renderInTable={false}
              />
            )}
          </div>
        </div>
      </div>

      <PromoCodeForm
        setSubTotal={setSubTotal}
        clientPhone={userData?.phone}
        promoCodeList={promoCodeList}
        setPromoCodeList={setPromoCodeList}
        setTotal={setTotal}
        total={total}
        setGatewayFees={setGatewayFees}
        gatewayFees={calculatedGatewayFees}
      />

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
          {/* <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center">
            <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              {t("GatewayFees")}
            </p>
            <div className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
              ${StripeNumber * 0.05}
            </div>
          </div> */}

          {/* {promoCodeList?.map((promo: any, index: number) => (
            <div
              key={index}
              className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center "
            >
              <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
                promo code
              </p>
              <div className="text-[#696969] [font-family:Inter] flex items-center gap-1 text-base font-normal leading-[normal]">
                {promo?.code} ({promo?.discount_percentage}%){" "}
                <Tooltip placement="topRight" title={"Remove promo code"}>
                  <IoMdClose
                    onClick={() => {
                      handleRemovePromoCode(promo, index);
                    }}
                    className="cursor-pointer"
                  />
                </Tooltip>
              </div>
            </div>
          ))} */}
        </div>
        <div className="w-full h-px [background:#E7E9EB] mt-[26px] mb-2"></div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-normal leading-[normal] text-[#696969]">
            {t("SubTotal")}
          </span>
          <span className="text-sm font-normal leading-[normal] text-black">
            {formatCurrency(
              Number(packageData?.price_after_discount) === 0
                ? Number(packageData?.original_price)
                : Number(packageData?.price_after_discount)
            )}
          </span>
        </div>

        {activePromoCode && (
          <>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-normal leading-[normal] text-[#696969]">
                {t("AdditionallDiscount")} (
                {activePromoCode.discount_percentage}
                %)
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-normal leading-[normal] text-green-600">
                  -{formatCurrency(discountAmount)}
                </span>
                <Tooltip placement="topRight" title={"Remove promo code"}>
                  <IoMdClose
                    onClick={() => {
                      handleRemovePromoCode(activePromoCode, 0);
                    }}
                    className="cursor-pointer"
                  />
                </Tooltip>
              </div>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-normal leading-[normal] text-[#696969]">
                {t("PriceAfterDiscount")}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-normal leading-[normal] text-black">
                  {formatCurrency(
                    Number(packageData?.price_after_discount) === 0
                      ? Number(packageData?.original_price)
                      : Number(packageData?.price_after_discount) -
                          discountAmount
                  )}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-normal leading-[normal] text-[#696969]">
            {t("GatewayFees")} (5%)
          </span>
          <span className="text-sm font-normal leading-[normal] text-black">
            {formatCurrency(calculatedGatewayFees)}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-solid border-[#E7E9EB] pt-3">
          <span className="text-base font-medium leading-[normal] text-black">
            {t("Total")}
          </span>
          <span className="text-base font-medium leading-[normal] text-black">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default PaymentInvoice;
