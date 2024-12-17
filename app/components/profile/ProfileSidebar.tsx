"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import editIcon from "@/assets/images/edit-icon.svg";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useRouter } from "next/navigation";

interface SidebarItem {
  icon: string;
  title: string;
  link: string;
}

const ProfileSidebar: React.FC = () => {
  const { locale } = useTranslationContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const sidebarRef = useRef<HTMLDivElement>(null);

  const sidebarItems: SidebarItem[] = [
    {
      icon: editIcon,
      title: "Public View",
      link: `/profile/public-view`,
    },
    {
      icon: editIcon,
      title: "Account",
      link: `/profile/account`,
    },
    {
      icon: editIcon,
      title: "Subscription",
      link: `/profile/subscription`,
    },
    {
      icon: editIcon,
      title: "Payment method",
      link: `/profile/payment`,
    },
    {
      icon: editIcon,
      title: "Privacy",
      link: `/profile/privacy`,
    },
    {
      icon: editIcon,
      title: "Notification",
      link: `/profile/notification`,
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
      className={`${isSidebarOpen ? "w-[200px]" : "w-[60px]"} 
      p-2 relative bg-white shadow-md h-screen  transition-width duration-300`}
      // When clicking inside the sidebar, open it
      onClick={() => setIsSidebarOpen(true)}
    >
      <div className="pt-[129px]">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center mb-4 px-4 rounded-2xl cursor-pointer gap-6 justify-start h-12 bg-gradient-to-r from-[#ffffff] to-[#cfe5fd]"
            onClick={() => handleItemClick(item.link)}
          >
            <Image src={item.icon} alt={item.title} className="w-[20px]" />
            {isSidebarOpen && <p>{item.title}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
