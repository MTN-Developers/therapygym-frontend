"use client";
import Image from "next/image";
import React from "react";
// import alertIcon fWrom "@/assets/images/Alarm.svg";
import { Button, Modal } from "antd";
import Close from "@/assets/components/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { IoClose, IoTvOutline } from "react-icons/io5";
// import dynamic from "next/dynamic";
import Trophy from "@/assets/svgs/Trophy";
import CurrencyDollarSimple from "@/assets/svgs/CurrencyDollarSimple";
import Clock from "@/assets/svgs/Clock@2x";
import Play from "@/assets/svgs/Play";
import { Course_package } from "@/types/packages";
import Logo from "@/assets/svgs/Logo";
import { RenderHTML } from "../shared/RenderHTML";
// const PlyrVideo = dynamic(
//   () => import("@/app/components/classroom/PlyrVideo"),
//   {
//     ssr: false,
//   }
// );

const RightSideCourseComp = ({ course }: { course: SubscribedCourse }) => {
  const [loading, setLoading] = React.useState(false);
  const [open_packages_modal, setOpenPackagesModal] = React.useState(false);
  const router = useRouter();
  const t = useTranslations("RightSideCourseComp");
  const { locale } = useTranslationContext();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (course?.status?.isSubscribed == false && course?.promo_video)
        setIsModalOpen(true);
    };
  }, [course?.status?.isSubscribed, course?.promo_video]);

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

    // if (course.id === "9c285b51-34fd-4a56-96b4-4943ba8ff561") {
    //   setTimeout(() => {
    //     router.push(`/awsClassroom/${course.id}`);
    //   }, 2000);
    // } else {
    setTimeout(() => {
      router.push(`/awsClassroom/${course.id}`);
    }, 2000);
    // }
  };

  const handlePlayVideo = () => {
    setIsModalOpen(true);
  };
  // console.log(course.packages, "course.packages");
  return (
    <div className="lg:w-[370px] lg:h-fit pb-6 bg-white rounded-xl shadow-lg z-[10]">
      {isModalOpen ? (
        <Modal
          width={1100}
          rootClassName="banner-video-modal"
          className="relative"
          footer={null}
          closeIcon={null}
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          onClose={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: course?.primary_color,
            }}
            onClick={() => setIsModalOpen(false)}
            className="absolute -top-[10px] -right-[10px] rounded-full z-50 cursor-pointer flex justify-between items-center px-2 py-2"
          >
            <IoClose color="#FFF" />
          </div>
          {/* <PlyrVideo src={course?.promo_video as string} /> */}
        </Modal>
      ) : null}
      {open_packages_modal && (
        <Modal
          closeIcon={<Close />}
          title=""
          className="packages-modal top-[50px]"
          rootClassName="packages-modal2"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          width={1350}
          style={{ background: "transparent" }}
          open={open_packages_modal}
          onOk={() => setOpenPackagesModal(false)}
          onCancel={() => setOpenPackagesModal(false)}
        >
          <div className="[font-family:Cairo] mt-4 flex flex-col w-full justify-center items-center">
            <h2 className="text-white text-[22px] lg:text-[62px] font-medium leading-[33px] lg:leading-[66px] mb-2">
              {t("ChoosePackage")}
            </h2>
            {/* <p className="w-[415px] shrink-0 text-[#C0C0C0] text-center text-lg font-bold leading-[66px]">
              {t("AffordableOptions")}
            </p> */}
            <div className="w-full">
              <Swiper
                lang="ar"
                dir={locale == "ar" ? "rtl" : "ltr"}
                direction="horizontal"
                spaceBetween={16}
                slidesPerView={"auto"}
                className="w-full h-fit"
              >
                {[...(course.packages || [])] // Create a new array using spread operator
                  .sort(
                    (a, b) => a.price_after_discount - b.price_after_discount
                  )
                  .map((pkg, idx) => (
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
          src={locale == "ar" ? course.logo_ar : course.logo_en}
          alt={course.name_ar}
          width={370}
          height={740}
          style={{
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
          className="w-full lg:h-[245px] mb-[12px] object-cover"
        />
        {course?.promo_video ? (
          <div
            onClick={handlePlayVideo}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-full cursor-pointer hover:shadow-2xl "
          >
            <Play color={course?.primary_color} />
          </div>
        ) : null}
        {/* <IoPlayCircleOutline  width={70} height={70} /> */}
      </div>
      <div className="w-full px-3 font-[pnu]">
        {/* <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>{<Clock color={course.primary_color} />}</span>
          {t("MeetingTime")}
        </p> */}
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Clock color={course?.primary_color} />
          </span>
          {t("LifetimeAccess")}
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <CurrencyDollarSimple color={course.primary_color} />
            {/* <Image src={dollarIcon} alt="icon" width={20} height={20} /> */}
          </span>
          {t("MoneyBackGuarantee")}
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Trophy color={course.primary_color} />
          </span>
          {t("Certificate")}
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <IoTvOutline color={course?.primary_color} size={19} />
          </span>
          {t("MultiDeviceAccess")}
        </p>
        <p className="flex items-center gap-2 font-bold text-[#595959] mb-[12px] text-sm">
          <span>
            <Logo color={course.primary_color} />
          </span>
          {t("SessionsOnLiveSystem")}
        </p>
        {/* <div className="flex justify-between items-center mb-3">
          {course?.original_price == course?.price_after_discount ? (
            <span className="text-2xl font-bold">
              ${course.price_after_discount}
            </span>
          ) : (
            <div>
              <span className="text-[#8C94A3] text-base font-normal line-through mx-2">
                ${course.original_price}
              </span>
              <span className="text-2xl font-bold">
                ${course.price_after_discount}
              </span>
            </div>
          )}
          <div>
            {course?.original_price == course?.price_after_discount ? null : (
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
            )}
          </div>
        </div> */}
        {/* {course?.original_price == course?.price_after_discount ? null : (
          <p className="flex items-center gap-2 font-bold text-[#e34444] mb-[12px] text-sm">
            <span>
              <Image src={alertIcon} alt="icon" width={20} height={20} />
            </span>
            {t("DaysLeft")}
          </p>
        )} */}
        <Button
          loading={loading}
          className="w-full primary-bg text-white text-xl rounded-lg h-[56px] "
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
        {/* <p>
          <span className="text-red-400 text-xs">{t("Note")}:</span>{" "}
          {t("RefundPolicy")}
        </p> */}
      </div>
    </div>
  );
};

export default RightSideCourseComp;

export const PackageCard = ({
  pkg,
  course_id,
}: {
  pkg: Course_package;
  course_id: string;
}) => {
  const t = useTranslations("PackageCard");
  const { locale } = useTranslationContext();
  const description = locale == "ar" ? pkg.description_ar : pkg.description_en;
  // console.log(description, "description");

  let packageDuration = "";
  switch (pkg.duration) {
    case 1:
      packageDuration = t("MonthlyPackage");
      break;
    case 3:
      packageDuration = t("QuarterlyPackage");
      break;
    case 6:
      packageDuration = t("HalfAnnualPackage");
      break;
    case 12:
      packageDuration = t("AnnualPackage");
      break;
  }

  return (
    <div
      dir={locale == "ar" ? "rtl" : "ltr"}
      className="w-[306px] lg:w-[415px] max-w-full bg-white rounded-xl shadow-lg p-6 border border-blue-200"
    >
      {/* Header */}
      <div className="bg-blue-100  text-blue-700 rounded-full inline-block px-4 py-1 text-sm font-medium mb-4">
        {packageDuration}
      </div>

      {/* Price */}
      <h1 className="text-blue-800 text-4xl font-bold mb-4">
        ${pkg.price_after_discount}
        {pkg.original_price == pkg.price_after_discount ? null : (
          <span className="text-lg font-normal">
            <span className="mx-1">{t("InsteadOf")}</span>
            {pkg.original_price}$
          </span>
        )}
      </h1>

      {/* Subscription Content */}
      <div className="text-gray-700  mb-6">
        <h2 className="text-xl font-bold mb-2">{t("SubscriptionContent")}</h2>
        <ul className="space-y-2" dir="rtl">
          <RenderHTML
            htmlContent={description as string}
            renderInTable={false}
          />
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
