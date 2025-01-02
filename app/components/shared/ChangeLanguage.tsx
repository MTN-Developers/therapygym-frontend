import { useAppSelector } from "@/app/store/store";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { Dropdown, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoLanguageOutline } from "react-icons/io5";

const ChangeLanguage = () => {
  const { locale } = useTranslationContext();
  const pathname = usePathname();
  const router = useRouter();
  const handleLanguageChange = (NewLocale: "ar" | "en") => {
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${NewLocale}/${path}`);
  };
  const useSelector = useAppSelector;

  const { currentCourse } = useSelector((state) => state.allCourses);

  const items: MenuProps["items"] = [
    {
      label: <span className="!font-['Cairo']">العربية</span>,
      key: "0",
      onClick: () => handleLanguageChange("ar"),
      style: {
        background: locale === "ar" ? "#f5f5f5" : "",
      },
    },
    {
      label: "English",
      key: "1",
      onClick: () => handleLanguageChange("en"),
      style: {
        background: locale === "en" ? "#f5f5f5" : "",
      },
    },
  ];

  // ## handlers
  function CourseIdExisted() {
    let pathArr = pathname.split("/");
    let courseId = pathArr[pathArr.length - 1];
    if (courseId.length > 10) {
      return currentCourse?.primary_color;
    }

    return "#0573F6";
  }

  return (
    <div className="flex items-center cursor-pointer content-center justify-center rounded-xl shadow-md w-[36px] h-[36px]">
      <Dropdown
        rootClassName="!w-32"
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <IoLanguageOutline color={CourseIdExisted()} size={20} />
      </Dropdown>
    </div>
  );
};

export default ChangeLanguage;
