"use client";

import GiftCard from "@/app/components/gifts/GiftCard";
// import useGetMyActiveGifts from "@/app/hooks/useGetMyActiveGifts";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("GiftsPage");
  //   const { data, error, isLoading } = useGetMyActiveGifts();

  //   console.log("gifts is ", data);

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     console.log(error); // Output the error detail
  //     return <div>Error</div>;
  //   }

  return (
    <div>
      <h1 className="text-blue-900 text-2xl lg:text-3xl font-bold ">
        {t("Gifts & Promotions")}
      </h1>
      <div className="w-full my-4">
        <h1 className="text-blue-900 text-2xl font-bold">Available Gifts</h1>
        <GiftCard
          description="The Emotional Balance Technique is a free gift! Feel free to share it with your friends and family."
          title="Monthly Bundel (Free Gift)"
        />
      </div>
    </div>
  );
};

export default Page;
