import Image from "next/image";
import React from "react";
import checkIcon from "@/assets/images/CheckCircle.svg";
import { useTranslations } from "next-intl";

const WhatYouGainComp = () => {
  const t = useTranslations("WhatYouGainComp");

  const points = [
    t("dummyText"),
    t("dummyText"),
    t("dummyText"),
    t("dummyText"),
  ];

  return (
    <div className="border-[15px] border-white shadow-sm lg:mx-[92px] lg:mb-16 lg:py-10 lg:px-5 bg-[#f7fbff] rounded-lg">
      <h2 className="text-[#017AFD] font-[pnu] text-2xl font-bold leading-8 tracking-[-0.24px]">
        {t("Heading")}
      </h2>
      <ul className="py-5">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3 py-2 mb-4">
            <Image
              src={checkIcon}
              alt="check icon"
              width={25}
              height={25}
              className="relative top-2"
            />
            <p className="text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
              {point}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatYouGainComp;
