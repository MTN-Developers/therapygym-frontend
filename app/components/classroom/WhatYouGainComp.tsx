import Image from "next/image";
import React from "react";
import checkIcon from "@/assets/images/CheckCircle.svg";

const WhatYouGainComp = () => {
  return (
    <div
      dir="rtl"
      className="  border-[15px] border-white shadow-sm lg:mx-[92px] lg:mb-16 lg:py-10 lg:px-5 bg-[#f7fbff] rounded-lg"
    >
      <h2 className="text-[#017AFD] px-4 pt-4 text-right font-[pnu] text-2xl font-bold leading-8 tracking-[-0.24px]">
        ما سوف تحصل عليه في نهاية الكورس
      </h2>
      <ul className="py-5">
        <li className="flex items-start gap-3  py-2 mb-4">
          <Image
            src={checkIcon}
            alt="check icon"
            width={25}
            height={25}
            className="relative top-2"
          />
          <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
            قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص أو
            العديد من النصوص إضافة عدد الحروف
          </p>
        </li>
        <li className="flex items-start gap-3  py-2 mb-4">
          <Image
            src={checkIcon}
            alt="check icon"
            width={25}
            height={25}
            className="relative top-2"
          />
          <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
            قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص أو
            العديد من النصوص إضافة عدد الحروف
          </p>
        </li>
        <li className="flex items-start gap-3  py-2 mb-4">
          <Image
            src={checkIcon}
            alt="check icon"
            width={25}
            height={25}
            className="relative top-2"
          />
          <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
            قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص أو
            العديد من النصوص إضافة عدد الحروف
          </p>
        </li>
        <li className="flex items-start gap-3  py-2 mb-4">
          <Image
            src={checkIcon}
            alt="check icon"
            width={25}
            height={25}
            className="relative top-2"
          />
          <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
            قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص أو
            العديد من النصوص إضافة عدد الحروف
          </p>
        </li>
      </ul>
    </div>
  );
};

export default WhatYouGainComp;
