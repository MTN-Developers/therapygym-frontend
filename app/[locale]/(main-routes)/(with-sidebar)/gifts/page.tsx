"use client";

import GiftCard from "@/app/components/gifts/GiftCard";
import ShareGiftModal from "@/app/components/gifts/ShareGiftModal";
import useGetMyActiveGifts from "@/app/hooks/useGetMyActiveGifts";
import { stripHtml } from "@/app/utils";
import axiosInstance from "@/app/utils/axiosInstance";
import { message } from "antd";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const [openShare, setOpenShare] = React.useState(false);
  const t = useTranslations("GiftsPage");
  const { data, error, isLoading } = useGetMyActiveGifts();
  const { locale } = useParams();
  const router = useRouter();

  const gifts = data?.data;

  console.log("gifts is ", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error); // Output the error detail
    return <div>Error</div>;
  }

  const handleActivate = async (giftId: string, courseId: string) => {
    console.log("activate");
    try {
      const res = await axiosInstance.patch(`/user-gift/${giftId}/use`);
      console.log("res is ", res);

      if (res.status === 200) {
        message.success("Gift Activated Successfully");
        router.push(`/${locale}/courses/${courseId}`);
        return true;
      } else {
        message.error("Gift Activation Failed");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div>
      <h1 className=" relative text-blue-900 text-2xl lg:text-3xl font-bold ">
        {t("Gifts & Promotions")}
      </h1>
      <div className="w-full my-4">
        <h1 className="text-blue-900 text-2xl font-bold">Available Gifts</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          {gifts.length > 0 ? (
            gifts?.map((gift) => (
              <>
                <GiftCard
                  giftId={gift.id}
                  key={gift.id}
                  courseId={gift.course.id}
                  description={
                    locale === "ar"
                      ? stripHtml(gift.course.description_ar)
                      : stripHtml(gift.course.description_en)
                  }
                  title={
                    locale === "ar"
                      ? stripHtml(gift.package.name_ar)
                      : stripHtml(gift.package.name_en)
                  }
                  onShare={() => {
                    setOpenShare(true);
                  }}
                  image={gift.course.banner_ar}
                  onActivate={handleActivate}
                />
                {openShare && (
                  <ShareGiftModal
                    giftId={gift.id}
                    handleClose={() => setOpenShare(false)}
                  />
                )}
              </>
            ))
          ) : (
            <p className="font-bold mx-auto text-center">No Gifts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
