"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";
import Image from "next/image";
import topRightVector from "@/assets/images/vector-top-right-signup.svg";
import bottomLeftVector from "@/assets/images/vector-bottom-left-signup.svg";

const Vectors = () => {
  const { locale } = useTranslationContext();
  return (
    <>
      {/* Top Right Vector */}
      <Image
        src={topRightVector}
        alt="vector"
        className={`absolute lg:-top-3 
            ${locale === "en" ? "lg:right-0 -right-12" : "lg:left-0 -left-12"} 
          
         -top-8`}
        style={{
          transform: locale === "en" ? "scaleX(1)" : " scaleX(-1)",
        }}
      />
      <Image
        src={bottomLeftVector}
        alt="vector"
        className="absolute bottom-0 left-0"
      />
    </>
  );
};

export default Vectors;
