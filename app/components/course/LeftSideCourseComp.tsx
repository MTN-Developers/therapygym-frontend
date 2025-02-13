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

// *** NEW: Import icons from lucide-react
import { Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react";

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

  // Only grab window.location.href on the client side
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://example.com";

  // The text you want to prepend to the shared link
  const shareMessage = "I'm taking this amazing course! Join me at";

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareMessage} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Open a new window for each social media platform, with the message included
  const shareToSocial = (platform: "twitter" | "facebook" | "linkedin") => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedMessage = encodeURIComponent(shareMessage);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedMessage}&summary=${encodedMessage}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
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
          <div className="flex gap-6 items-center">
            <p className="text-[color:var(--Neutral-70,#595959)] text-sm font-medium leading-[22px] tracking-[-0.14px]">
              {t("ProvidedBy")}
            </p>
            <p className="color-primary text-base font-medium leading-[22px] underline">
              {t("Doctor")}{" "}
            </p>
            {/* here is the share buttons  */}
            <div className="flex items-center gap-2">
              {/* Twitter */}
              <div
                onClick={() => shareToSocial("twitter")}
                className="p-2 rounded-full bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
              >
                <Twitter className="w-5 h-5" />
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
