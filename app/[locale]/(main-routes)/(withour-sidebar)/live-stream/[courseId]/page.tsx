import { useTranslations } from "next-intl";
import React from "react";

const Page = ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const t = useTranslations("LiveStreamPage");
  return (
    <div className="flex flex-col gap-2 w-full items-start justify-start">
      <h2 className="font-semibold text-xl"> {t("LiveStream")}</h2>
      <p>{params.courseId}</p>
    </div>
  );
};

export default Page;
