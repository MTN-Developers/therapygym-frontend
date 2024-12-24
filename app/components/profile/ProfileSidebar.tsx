"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import userIcon from "@/assets/images/user-icon.svg";
import editIcon from "@/assets/images/edit-icon.svg";
import accounIcon from "@/assets/images/account-icon.svg";
import subscribeIcon from "@/assets/images/subscribe-icon.svg";
import paymentIcon from "@/assets/images/payment-icon.svg";
import privacyIcon from "@/assets/images/privacy-icon.svg";
import notificationIcon from "@/assets/images/notification-icon.svg";
import { useRouter, usePathname } from "next/navigation";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useTranslations } from "next-intl";

interface SidebarItem {
  icon: string;
  title: string;
  link: string;
}

const ProfileSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { locale } = useTranslationContext();
  const t = useTranslations("ProfilePages.Sidebar");

  const sidebarItems: SidebarItem[] = [
    {
      icon: userIcon,
      title: t("Public View"),
      link: `/${locale}/profile/public-view`,
    },
    {
      icon: editIcon,
      title: t("Edit Profile"),
      link: `/${locale}/profile/edit-profile`,
    },
    {
      icon: accounIcon,
      title: t("Account"),
      link: `/${locale}/profile/account`,
    },
    {
      icon: subscribeIcon,
      title: t("Subscription"),
      link: `/${locale}/profile/subscription`,
    },
    {
      icon: paymentIcon,
      title: t("Payment method"),
      link: `/${locale}/profile/payment-method`,
    },
    {
      icon: privacyIcon,
      title: t("Privacy"),
      link: `/${locale}/profile/privacy`,
    },
    {
      icon: notificationIcon,
      title: t("Notification"),
      link: `/${locale}/profile/notification`,
    },
  ];

  const handleItemClick = (link: string) => {
    router.push(link);
  };

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`
        relative
        ${locale === "en" ? "right-7" : "left-7"}
        lg:sticky 
        top-0 
        ${isSidebarOpen ? "!w-[240px]" : "w-[58px]"}
        p-1 
        bg-white 
        shadow-md 
        transition-width 
        flex-shrink-0
        duration-300 
        overflow-y-auto 
      `}
      onClick={() => setIsSidebarOpen(true)}
    >
      <div className="pt-[129px]">
        {sidebarItems.map((item, index) => {
          const isActive = pathname === item.link;

          return (
            <div
              key={index}
              className={`
                flex 
                items-center 
                mb-4 
                px-4 
                rounded-2xl 
                cursor-pointer 
                gap-6 
                justify-start 
                h-12 
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#ffffff] to-[#d0e5fd] text-black"
                    : "bg-white hover:bg-gray-100 text-[#313947]"
                }
              `}
              onClick={() => handleItemClick(item.link)}
            >
              <span className="inline-flex items-center justify-center w-[20px] h-[20px] flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </span>
              {isSidebarOpen && (
                <p className="font-poppins font-semibold whitespace-nowrap ml-2">
                  {item.title}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSidebar;
