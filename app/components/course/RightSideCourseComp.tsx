"use client";
import Image from "next/image";
import React from "react";
import clockIcon from "@/assets/images/Clock@2x.svg";
import dollarIcon from "@/assets/images/CurrencyDollarSimple.svg";
import cupIcon from "@/assets/images/Trophy.svg";
import tvIcon from "@/assets/images/tv.png";
import alertIcon from "@/assets/images/Alarm.svg";
import { Button, Modal } from "antd";
import Close from "@/assets/components/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";

const RightSideCourseComp = ({ course }: { course: SubscribedCourse }) => {
  const [loading, setLoading] = React.useState(false);
  const [open_packages_modal, setOpenPackagesModal] = React.useState(false);
  const router = useRouter();
  const t = useTranslations("RightSideCourseComp");
  const { locale } = useTranslationContext();

  const handlePurchaseButton = () => {
    switch (course.type) {
      case "standalone":
        router.push(`/courses/${course.id}/payment`);
        break;
      case "standalone_subscribe":
        router.push(`/courses/${course.id}/purchase-options`);
        break;
      case "subscribe":
        setOpenPackagesModal(true);
        break;
      default:
        console.error("Unknown course type");
        break;
    }
  };

  const handleRedirectToCourse = () => {
    setLoading(true);

    setTimeout(() => {
      router.push(`/classroom/${course.id}`);
    }, 2000);
  };
  return (
    <div className="lg:w-[370px] lg:h-fit pb-6 bg-white rounded-xl shadow-lg z-50">
      {open_packages_modal && (
        <Modal
          closeIcon={<Close />}
          title=""
          className="packages-modal top-[50px]"
          rootClassName="packages-modal2"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          width={1100}
          style={{ background: "transparent" }}
          open={open_packages_modal}
          onOk={() => setOpenPackagesModal(false)}
          onCancel={() => setOpenPackagesModal(false)}
        >
          <div className="[font-family:Cairo] mt-4 flex flex-col w-full justify-center items-center">
            <h2 className="text-white text-[62px] font-medium leading-[66px] mb-2">
              {t("ChoosePackage")}
            </h2>
            <p className="w-[415px] shrink-0 text-[#C0C0C0] text-center text-lg font-bold leading-[66px]">
              {t("AffordableOptions")}
            </p>
            <div className="w-full">
              <Swiper
                spaceBetween={16}
                slidesPerView={"auto"}
                className="w-full h-fit"
              >
                {course.packages?.map((pkg, idx) => (
                  <SwiperSlide key={idx} className="!w-[306px] !lg:w-[415px]">
                    <PackageCard course_id={course.id} pkg={pkg} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </Modal>
      )}
      <div className="relative">
        <Image
          src={locale == "ar" ? course.banner_ar : course.banner_en}
          alt={course.name_ar}
          width={370}
          height={740}
          style={{
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
          className="w-full lg:h-[245px] mb-[12px] object-cover"
        />
      </div>
      <div className="w-full px-3 font-[pnu]">
        <p className="font-bold mb-[12px]">{t("LifetimeAccess")}</p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Image src={clockIcon} alt="icon" width={20} height={20} />
          </span>
          {t("LifetimeAccess")}
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Image src={dollarIcon} alt="icon" width={20} height={20} />
          </span>
          {t("MoneyBackGuarantee")}
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Image src={cupIcon} alt="icon" width={20} height={20} />
          </span>
          {t("Certificate")}
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Image src={tvIcon} alt="icon" width={20} height={20} />
          </span>
          {t("MultiDeviceAccess")}
        </p>
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[#8C94A3] text-base font-normal line-through mx-2">
              ${course.original_price}
            </span>
            <span className="text-2xl font-bold">
              ${course.price_after_discount}
            </span>
          </div>
          <div>
            <button className="flex items-center bg-[#e9eef4] text-red-400 px-3 py-2 text-xl rounded">
              <span className="text-[15px] font-bold mx-2">OFF</span>
              <span>
                {Math.round(
                  ((course.original_price - course.price_after_discount) /
                    course.original_price) *
                    100
                )}
                %
              </span>
            </button>
          </div>
        </div>
        <p className="flex items-center gap-2 font-bold text-[#e34444] mb-[12px] text-sm">
          <span>
            <Image src={alertIcon} alt="icon" width={20} height={20} />
          </span>
          {t("DaysLeft")}
        </p>
        <Button
          loading={loading}
          className="w-full bg-[#017AFD] text-white text-xl rounded-lg h-[56px] mb-3"
          onClick={
            course?.status?.isPurchased || course?.status?.isSubscribed
              ? handleRedirectToCourse
              : handlePurchaseButton
          }
        >
          {course?.status?.isPurchased || course?.status?.isSubscribed
            ? t("ContinueYourJourney")
            : t("SubscribeNow")}
        </Button>
        <p>
          <span className="text-red-400 text-xs">{t("Note")}:</span>{" "}
          {t("RefundPolicy")}
        </p>
      </div>
    </div>
  );
};

export default RightSideCourseComp;

const PackageCard = ({
  pkg,
  course_id,
}: {
  pkg: course_package;
  course_id: string;
}) => {
  const t = useTranslations("PackageCard");

  let duration = "";
  switch (pkg.duration) {
    case 1:
      duration = t("Monthly");
      break;
    case 3:
      duration = t("ThreeMonths");
      break;
    case 6:
      duration = t("SixMonths");
      break;
    case 12:
      duration = t("Yearly");
      break;
  }

  return (
    <div className="w-[306px] lg:w-[415px] max-w-full bg-white rounded-xl shadow-lg p-6 border border-blue-200">
      {/* Header */}
      <div className="bg-blue-100 text-blue-700 rounded-full inline-block px-4 py-1 text-sm font-medium mb-4">
        {t("SubscriptionPackage")}
      </div>

      {/* Price */}
      <h1 className="text-blue-800 text-4xl font-bold mb-4">
        ${pkg.price_after_discount}
        <span className="text-lg font-normal">/{duration}</span>
      </h1>

      {/* Subscription Content */}
      <div className="text-gray-700  mb-6">
        <h2 className="text-xl font-bold mb-2">{t("SubscriptionContent")}</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl font-bold mr-2">✔</span>
            {t("RecordedEpisodes")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl font-bold mr-2">✔</span>
            {t("LiveMeetings")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl font-bold mr-2">✔</span>
            {t("MeetingDuration")}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500 text-xl font-bold mr-2">✔</span>
            {t("CommunitySupport")}
          </li>
        </ul>
      </div>

      {/* Subscribe Button */}
      <Link href={`/courses/${course_id}/payment/${pkg.id}`}>
        <Button className="bg-blue-700 text-white font-bold !py-3 !px-6 !h-[54px] font-[Cairo] rounded-lg w-full hover:bg-blue-800 transition">
          {t("SubscribeNow")}
        </Button>
      </Link>
    </div>
  );
};
