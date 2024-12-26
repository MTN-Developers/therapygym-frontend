import React from "react";
import colseIcon from "@/assets/images/close-circle.svg";
import yellowTriangle from "@/assets/images/yellow-triangle.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";

interface IProps {
  popupVisible: boolean;
  setShowPopup: (_value: boolean) => void;
}
const WarningBox = ({ popupVisible, setShowPopup }: IProps) => {
  const t = useTranslations("ProfilePages.Edit Page");
  const { locale } = useTranslationContext();
  return (
    <>
      <div
        className={`bg-white lg:flex text-center flex-col items-center justify-center fixed ${
          locale === "en" ? "bottom-4 right-4" : "bottom-4 left-4"
        } p-4 rounded-lg shadow-sm border max-w-[260px] border-yellow-500 transition-all duration-500 ${
          popupVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {" "}
        <Image
          src={colseIcon}
          alt="close"
          className={`absolute top-4 cursor-pointer ${
            locale === "en" ? "right-4" : "left-4"
          }`}
          onClick={() => setShowPopup(false)}
        />
        <Image src={yellowTriangle} alt="yellow triangle" />
        <p className="w-full">{t("Warning")}</p>
      </div>
    </>
  );
};

export default WarningBox;
