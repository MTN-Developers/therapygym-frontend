"use client";
// out-pay page
import PaymentForm from "@/app/components/payment/PaymentForm";
// import NotFoundComponent from "@/app/components/shared/NotFound";
import { getOne } from "@/services/server";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import PaymentInvoice from "@/app/components/payment/PaymentInvoice";
import { useTranslations } from "next-intl";
// import { Course_package, getPackage } from "@/types/packages";
import { Package, PackagesResponse } from "@/types/publicCoursePackages";

interface PromoCode {
  code: string;
  discount_percentage: number;
}

const Page = ({
  params,
}: {
  params: {
    packageId: string;
    id: string;
  };
}) => {
  const { id, packageId } = params;

  console.log("ahmed", id);

  const t = useTranslations("PaymentPage");
  const [promoCodeList, setPromoCodeList] = React.useState<PromoCode[]>([]);

  const { data, isLoading } = useSWR<PackagesResponse>(
    `/package/course/${id}`,
    getOne
  );

  const selectedPackage = data?.data?.find((packag) => packag.id === packageId);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spin indicator={<LoadingOutlined />} />
      </div>
    );
  }

  if (!data?.data && isLoading === false) {
    // return <NotFoundComponent />;
    return <>it is going to login couse no data</>;
  }

  if (isLoading === false && selectedPackage.id !== packageId) {
    console.log(selectedPackage.id, packageId);

    // return <NotFoundComponent />;
    return <>it is going to login couse id is false</>;
  }

  return (
    <div className="size-full flex-wrap px-4 py-10 lg:p-0 gap-0 flex justify-between h-fit bg-white rounded-lg shadow-md">
      <div className="w-full lg:w-1/2 min-h-[700px] h-fit lg:flex relative">
        <div
          className="absolute w-full"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
          }}
        >
          <PaymentInvoice
            promoCodeList={promoCodeList}
            setPromoCodeList={setPromoCodeList}
            packageData={selectedPackage as Package}
            courseId={id}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 py-[28px]">
        <div className="w-[540px] min-h-full h-fit p-4 max-w-full flex justify-center flex-col">
          <div className="flex flex-col gap-4">
            <Image
              src={"/images/mtn-live.svg"}
              width={150}
              height={150}
              className="mb-4"
              alt="MTN Live"
            />

            <p className="text-[32px] items-center gap-2 lg:text-4xl font-['Cairo'] font-medium leading-[normal] tracking-[0.72px]">
              {t("PayNow")}
            </p>

            <p className="w-fit flex items-center gap-2 max-w-full text-[#8D93A1] font-['Cairo'] text-xs font-normal leading-[150%] tracking-[0.24px]">
              {t("EnterDetails")}
            </p>
          </div>

          <PaymentForm
            promoCodeList={promoCodeList}
            Package={selectedPackage as Package}
            courseId={id}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
