import Image from "next/image";
import React from "react";
import imgPlaceholder from "@/public/images/male.jpg";
import freeGiftBadge from "@/public/images/free-gift.svg";
import { Button } from "antd";

type Props = {
  image?: string;
  title: string;
  description: string;
  onActivate?: () => void;
  onShare?: () => void;
};

const GiftCard = ({
  description,
  image,
  onActivate,
  onShare,
  title,
}: Props) => {
  return (
    <div className="w-full bg-gray-50 lg:min-h-[128px] shadow-md p-6 rounded-lg flex flex-col lg:flex-row items-center justify-center gap-4">
      <div className="lg:w-[205px]  overflow-hidden rounded-md h-[128px] w-full">
        <Image
          src={image || imgPlaceholder}
          alt="gift image"
          className="w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 justify-center items-start">
        <Image src={freeGiftBadge} alt="free gift badge" />
        <h2 className="text-neutral-700 text-xl lg:text-2xl font-bold">
          {title}
        </h2>
        <p className="text-stone-500 text-sm lg:text-base font-normal">
          {description}
        </p>
      </div>

      <div className="flex w-full gap-4 lg:w-[278px] lg:h-[128px] py-2  items-center justify-between flex-col">
        <Button
          onClick={onActivate}
          className="bg-[#017afd] h-[50px] text-white w-full text-center flex items-center justify-center"
        >
          Activate
        </Button>
        <Button
          onClick={onShare}
          className="bg-[#ffffff] h-[50px] border border-[#017afd] text-[#017afd]  w-full text-center flex items-center justify-center"
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default GiftCard;
