"use client";
import React, { useState } from "react";
import { Breadcrumb, Tabs } from "antd";
// import { LuUsersRound } from "react-icons/lu";
import { SlNotebook } from "react-icons/sl";
import type { TabsProps } from "antd";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useTranslations } from "next-intl";
import Clock from "@/assets/svgs/Clock@2x";
import Star from "@/assets/svgs/Star";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

// *** NEW: Import icons from lucide-react
import {
  // Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
  // MessageCircle,
} from "lucide-react";

interface IProps {
  items: TabsProps["items"];
  onChange: TabsProps["onChange"];
  course: SubscribedCourse;
}

const LeftSideCourseComp = ({ items, onChange, course }: IProps) => {
  const t = useTranslations("LeftSideCourseComp");
  const { locale } = useTranslationContext();

  // 1. SHARE LOGIC + useState
  // -----------------------------
  const [copied, setCopied] = useState(false);

  // The text you want to prepend to the shared link
  const shareMessage = "I'm taking this amazing course! Join me at";

  // Only grab window.location.href on the client side
  const currentPageUrl =
    typeof window !== "undefined" ? window.location.href : "";

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareMessage} ${currentPageUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Open a new window for each social media platform, with the message included
  const shareToSocial = (
    platform: "twitter" | "facebook" | "linkedin" | "whatsapp"
  ) => {
    const encodedUrl = encodeURIComponent(currentPageUrl);
    const encodedMessage = encodeURIComponent(shareMessage);

    let socialShareUrl; // Changed variable name here

    switch (platform) {
      case "facebook":
        // Facebook sharing URL
        socialShareUrl = `https://www.facebook.com/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        // Twitter sharing URL
        socialShareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`;
        break;
      case "linkedin":
        // LinkedIn sharing URL
        socialShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        socialShareUrl = `https://api.whatsapp.com/send?text=${encodedMessage}%20${encodedUrl}`;
        break;

      default:
        return;
    }

    const windowFeatures =
      "width=600,height=400,left=" +
      (window.innerWidth - 600) / 2 +
      ",top=" +
      (window.innerHeight - 400) / 2;

    window.open(socialShareUrl, "_blank", windowFeatures);
  };

  // -----------------------------
  // END SHARE LOGIC
  // -----------------------------

  return (
    <div className="font-[pnu] max-w-full">
      <div className="mt-4 mb-8 right-4 z-10">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: t("Home"),
              href: "/",
            },
            {
              title: course?.category,
              href: "/",
            },
            {
              title: locale == "ar" ? course.name_ar : course?.name_en, // Switch to `name_en` dynamically based on locale if needed
            },
          ]}
        />
        <div>
          <h1 className="text-[#353535] font-[pnu] text-[32px] font-bold leading-[160%]">
            {
              locale == "ar" ? course.name_ar : course?.name_en // Switch to `name_en` dynamically based on locale if needed
            }
          </h1>
          <p className="w-[607px] max-w-full text-[rgba(33,33,33,0.60)] font-[pnu] mb-6 text-base font-normal leading-[160%]">
            {
              locale == "ar" ? course.description_ar : course?.description_en // Switch to `description_en` dynamically based on locale if needed
            }
          </p>
          <div className="flex gap-4 mb-4 flex-wrap">
            <p className="flex items-center gap-1">
              <Star color={course.primary_color} />
              {/* <Image src={starIcon} alt="star icon" width={20} height={20} /> */}
              <span className="font-bold">4.8</span>
              {/* (451,444 {t("StarRating")}) */}
            </p>
            <p className="flex items-center gap-1">
              {<Clock color={course.primary_color} />}3 {t("WeeksDuration")}
            </p>
            <p className="flex items-center gap-1">
              {<Clock color={course.primary_color} />}
              {t("TimeDuration")}
            </p>
            <p className="flex items-center gap-1">
              <SlNotebook color={course?.primary_color} size={19} />
              {t("ArabicLanguage")}
            </p>
          </div>
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <p className="text-[color:var(--Neutral-70,#595959)] text-sm font-medium leading-[22px] tracking-[-0.14px]">
                {t("ProvidedBy")}
              </p>
              <p className="color-primary text-base font-medium leading-[22px] underline">
                {t("Doctor")}{" "}
              </p>
            </div>
            {/* here is the share buttons  */}
            <div className="flex items-center gap-2">
              {/* Twitter */}
              <div
                onClick={() => shareToSocial("twitter")}
                className="p-2 rounded-full bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
              >
                <FaXTwitter className="w-5 h-5" />
              </div>

              {/* Facebook */}
              <div
                onClick={() => shareToSocial("facebook")}
                className="p-2 rounded-full bg-[#4267B2] text-white hover:bg-[#365899] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </div>

              {/* LinkedIn */}
              <div
                onClick={() => shareToSocial("linkedin")}
                className="p-2 rounded-full bg-[#0077B5] text-white hover:bg-[#006399] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </div>
              {/* WhatsApp */}
              <div
                onClick={() => shareToSocial("whatsapp")}
                className="p-2 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
              >
                <IoLogoWhatsapp className="w-5 h-5" />
              </div>

              {/* Copy Link */}
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="-z-20">
        <div className="w-[709px] max-w-full font-[pnu] lg:mb-20 z-30">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default LeftSideCourseComp;
