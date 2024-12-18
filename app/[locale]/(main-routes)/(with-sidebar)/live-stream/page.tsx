import SelectCourse from "@/app/components/live/SelectCourse";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("LiveStreamPage");
  return (
    <div className="flex flex-col gap-2 w-full items-start justify-start">
      <h2 className="font-semibold text-xl">
        {" "}
        {t("LiveStream")} . {t("PleaseChoose")}
      </h2>

      <SelectCourse />
    </div>
  );
};

export default Page;
