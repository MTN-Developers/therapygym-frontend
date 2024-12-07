// "use client";
// import Image from "next/image";
// import React from "react";
// // import PaymentForm from "@/app/(auth)/auth/register/[packageId]/PaymentForm";
// import useSWR from "swr";
// import NotFound from "@/app/not-found";
// import { Spin } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import PaymentForm from "@/components/shared/Payment/PaymentForm";
// import { getAll } from "@/services/server";
// const Page = ({
//   params,
// }: {
//   params: {
//     packageId: string;
//   };
// }) => {
//   const { packageId } = params;
//   const { data, isLoading } = useSWR("packages", getAll);

//   const packages: Package[] = data?.data?.data;
//   const Package = packages?.filter((p) => p.id == packageId)[0];

//   if (isLoading) {
//     return (
//       <div className="w-full h-full flex items-center justify-center">
//         <Spin indicator={<LoadingOutlined />} />
//       </div>
//     );
//   }

//   if (!Package && isLoading == false) {
//     return <NotFound />;
//   }

//   if (isLoading == false && Package == undefined) {
//     return <NotFound />;
//   }
//   return (
//     <div className="size-full flex-wrap px-4 py-10 lg:p-0 gap-0 flex justify-between h-full bg-white rounded-lg shadow-md">
//       <div className="w-full lg:w-1/2 h-[600px]  lg:flex relative">
//         <div
//           className="absolute w-full"
//           style={{
//             left: "50%",
//             top: "50%",
//             transform: "translate(-50%, -50%)",
//             background: "transparent",
//           }}
//         >
//           <CoursePrices packageData={Package as Package} />
//         </div>
//       </div>
//       <div className="w-full lg:w-1/2 py-[28px]">
//         <div className="w-[540px] min-h-full h-fit p-4 max-w-full flex justify-center flex-col">
//           <div className="flex flex-col gap-4">
//             <Image
//               src={"/images/logo-with-text.svg"}
//               width={150}
//               height={150}
//               alt="Estro Gym Logo"
//             />

//             <p className="text-[32px] items-center gap-2 lg:text-4xl font-['Cairo'] font-medium leading-[normal] tracking-[0.72px]">
//               ادفع الأن
//             </p>

//             <p className="w-fit flex items-center gap-2 max-w-full text-[#8D93A1] font-['Cairo'] text-xs font-normal leading-[150%] tracking-[0.24px]">
//               قم بادخال بياناتك واستمتع بتجربه مستخدم ممتازه
//             </p>
//           </div>

//           <PaymentForm packageId={packageId} Package={Package} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

// const CoursePrices = ({ packageData }: { packageData: Package }) => {
//   const StripeNumber =
//     Number(packageData?.price_after_discount) == 0
//       ? Number(packageData?.original_price)
//       : Number(packageData?.price_after_discount);

//   const calculatedGatewayFees = StripeNumber * 0.05;

//   return (
//     <div
//       style={{
//         background: "rgb(245 248 251 / 59%)",
//         backdropFilter: "blur(5px)",
//       }}
//       className="w-full rounded-2xl h-full lg:w-[432px] max-w-full p-10 shrink-0"
//     >
//       <div
//         id="course-info"
//         className="flex-col lg:flex-row  w-full mb-6 min-h-[108px] h-fit shrink-0 [background:#FFF] rounded-2xl py-[10px] px-[10px] flex items-center gap-[13px]"
//       >
//         <div className="w-[114px] courseImg h-[88px] flex items-center justify-center shrink-0 [background:#F5F7F9] rounded-md">
//           <Image
//             src={"/images/logo-with-text.svg"}
//             width={96}
//             height={40}
//             alt=""
//           />
//         </div>
//         <div className="flex flex-col gap-3">
//           <div className="w-fit text-[#2B2B2B] [font-family:Inter] text-base font-medium leading-[normal]">
//             استروجيم نوفمبر 2024{" "}
//             {packageData?.name ? `- ${packageData?.name}` : ""}
//           </div>
//         </div>
//       </div>

//       <div
//         id="calculations"
//         className=" w-full min-h-[178px] mt-7  h-fit p-[15px] shrink-0 [background:#FFF] rounded-[10px]"
//       >
//         <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
//           تفاصيل الدفع
//         </p>
//         <div className=" w-full h-px [background:#E7E9EB] mt-2 mb-4"></div>
//         <div className="flex flex-col gap-[13px] w-full">
//           <div className="w-full flex flex-row flex-wrap justify-between items-start lg:items-center ">
//             <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
//               سعر الاشتراك
//             </p>
//             <div className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
//               ${packageData?.original_price}
//             </div>
//           </div>
//           <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center ">
//             <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
//               الخصم
//             </p>
//             <div className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
//               ${" "}
//               {Number(packageData?.price_after_discount) == 0
//                 ? "0"
//                 : Number(packageData?.original_price) -
//                   Number(packageData?.price_after_discount)}
//             </div>
//           </div>
//           <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center ">
//             <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
//               السعر بعد الخصم
//             </p>
//             <div className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
//               $
//               {Number(packageData?.price_after_discount) == 0
//                 ? Number(packageData?.original_price)
//                 : Number(packageData?.price_after_discount)}
//             </div>
//           </div>
//           <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center ">
//             <p className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
//               رسوم البوابة
//             </p>
//             <div className="text-[#696969] [font-family:Inter] text-base font-normal leading-[normal]">
//               ${calculatedGatewayFees}
//             </div>
//           </div>
//         </div>
//         <div className=" w-full h-px [background:#E7E9EB] mt-[26px] mb-2"></div>
//         <div className="flex-row flex-wrap w-full flex justify-between items-start lg:items-center ">
//           <p className="text-[#696969] [font-family:Inter] text-base font-semibold leading-[normal]">
//             الاجمالي
//           </p>
//           <div className="text-[#000] font-bold [font-family:Inter] text-base leading-[normal]">
//             ${StripeNumber + calculatedGatewayFees}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";
import PaymentForm from "@/app/components/payment/PaymentForm";
import NotFoundComponent from "@/app/components/shared/NotFound";
import { getOne } from "@/services/server";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import PaymentInvoice from "@/app/components/payment/PaymentInvoice";

const Page = ({
  params,
}: {
  params: {
    packageId: string;
    id: string;
  };
}) => {
  const { id, packageId } = params;
  console.log(id, "Course ID");
  const { data, isLoading } = useSWR<getPackage>(
    `/package/${packageId}`,
    getOne
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spin indicator={<LoadingOutlined />} />
      </div>
    );
  }

  if (!data?.data && isLoading == false) {
    return <NotFoundComponent />;
  }

  if (isLoading == false && data?.data == undefined) {
    return <NotFoundComponent />;
  }
  if (isLoading == false && data?.data?.course_id != id) {
    return <NotFoundComponent />;
  }
  return (
    <div
      dir="rtl"
      className="size-full flex-wrap px-4 py-10 lg:p-0 gap-0 flex justify-between h-full bg-white rounded-lg shadow-md"
    >
      <div className="w-full lg:w-1/2 h-[600px]  lg:flex relative">
        <div
          className="absolute w-full"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
          }}
        >
          <PaymentInvoice packageData={data?.data as course_package} />
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
              alt="Estro Gym Logo"
            />

            <p className="text-[32px] items-center gap-2 lg:text-4xl font-['Cairo'] font-medium leading-[normal] tracking-[0.72px]">
              ادفع الأن
            </p>

            <p className="w-fit flex items-center gap-2 max-w-full text-[#8D93A1] font-['Cairo'] text-xs font-normal leading-[150%] tracking-[0.24px]">
              قم بادخال بياناتك واستمتع بتجربه مستخدم ممتازه
            </p>
          </div>

          <PaymentForm Package={data?.data as course_package} />
        </div>
      </div>
    </div>
  );
};

export default Page;
