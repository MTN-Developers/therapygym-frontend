"use client";

import { PackageCard } from "@/app/components/course/RightSideCourseComp";
import { RenderHTML } from "@/app/components/shared/RenderHTML";
import { setCurrentCourse } from "@/app/store/slices/allCoursesSlice";
import Close from "@/assets/components/Close";
import { useTranslationContext } from "@/contexts/TranslationContext";
import { getOne } from "@/services/server";
import { SubscriptionApiResponse, Subscription } from "@/types/packages";
import { Button, Modal, Spin } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";

const Page = () => {
  // const { locale } = useTranslationContext();
  const t = useTranslations("ProfilePages.SubscriptionPage");

  // Fetch data using SWR and your `getOne` service
  const {
    data: subscriptionData,
    isLoading,
    error,
  } = useSWR<SubscriptionApiResponse>("/user-package/me", getOne);

  // Extract the subscriptions array (called `data` in your API)
  const mySubscriptions = subscriptionData?.data;

  return (
    <div className={"p-4 w-full  "}>
      <h2 className="text-[#164194] mb-4 text-2xl lg:text-4xl font-bold leading-normal">
        {t("Subscription")}
      </h2>
      <h3 className="text-[#15162c] mb-4 text-2xl lg:text-3xl font-bold leading-normal">
        {t("Active planes")}
      </h3>

      <div className="w-full">
        {error && <p>{error}</p>}
        {isLoading && (
          <p>
            <Spin />
          </p>
        )}
        {mySubscriptions?.length === 0 && (
          <p>You are not subscribed to any course yet ...</p>
        )}
        {mySubscriptions?.map((subscription) => (
          <div key={subscription.id} className="mb-6">
            {/* Display the package name (English) */}
            {/* <p>{subscription.package.name_en}</p> */}
            {/* Pass the entire subscription to the component */}
            <CourseCard subscription={subscription} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

/**
 * Renders a card with subscription, package, and course information.
 * Also calculates remaining days until the subscription ends.
 */
const CourseCard = ({ subscription }: { subscription: Subscription }) => {
  const { locale } = useTranslationContext();
  const t = useTranslations("ProfilePages.SubscriptionPage");
  const { end_date } = subscription;
  const packag = subscription.package; // The "package" object within subscription
  const course = subscription.course; // The "course" object within package
  console.log(subscription.package);
  // Calculate remaining days
  const now = new Date();
  const endDate = new Date(end_date);
  const differenceMs = endDate.getTime() - now.getTime();
  const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  const remaining = differenceDays > 0 ? differenceDays : 0; // Don't show negative days
  const endDateObj = new Date(end_date);
  const router = useRouter();
  const dispatch = useDispatch();
  const [open_packages_modal, setOpenPackagesModal] = React.useState(false);
  const {
    data: courses,
    // error,
    // isLoading,
  } = useSWR<getCourse>(`/course/${subscription.course.id}`, getOne, {
    revalidateOnFocus: false,
    onSuccess: (data) => {
      dispatch(setCurrentCourse(data.data));
    },
  });

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

  const endDateString = endDateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div
      className={`border text-nowrap lg:w-[895px] w-[270px] rounded-xl shadow-sm p-2 lg:p-6 flex flex-col gap-4 lg:flex-row items-start lg:items-center`}
      style={{
        borderColor: course?.primary_color,
      }}
    >
      {/* Image holder */}
      <div className="lg:min-w-[200px] object-cover lg:h-[123px] bg-gray-400  h-[192px] rounded-sm shadow-sm overflow-hidden">
        <Image
          src={locale === "en" ? course?.banner_en : course?.banner_ar}
          alt={course?.name_en || "Course Banner"}
          width={250}
          height={123}
          className="object-cover !lg:w-[280px] w-full h-full rounded-sm shadow-sm"
        />
      </div>
      {/* Info holder */}
      <div className="flex flex-col items-start gap-1">
        <div
          style={{ backgroundColor: course?.primary_color }}
          className="rounded-lg flex items-center text-nowrap justify-center py-2 px-4 w-[120px] h-[27px] text-white font-bold text-center"
        >
          Current Bundle
        </div>
        <p className="self-stretch text-[#353535] [font-family:PNU] text-lg lg:text-2xl font-bold leading-[160%]">
          {locale === "en" ? (
            <RenderHTML htmlContent={packag?.name_en} renderInTable={false} />
          ) : (
            <RenderHTML htmlContent={packag?.name_ar} renderInTable={false} />
          )}
        </p>
        <p className="text-[#636363] text-right [font-family:PNU] text-[15px] font-bold leading-[160%]">
          {locale === "en" ? course?.name_en : course?.name_ar}
        </p>

        {/* Price and discount */}
        <div className="flex items-center gap-1">
          <span className="line-through w-11 shrink-0 text-base font-normal leading-6 text-gray-500">
            ${packag?.original_price}
          </span>
          <span className="text-2xl font-bold leading-8 text-gray-900">
            ${packag?.price_after_discount}
          </span>
          {/* Calculate discount percentage */}
          {course?.original_price && course?.price_after_discount && (
            <span className="flex ml-10 text-xs text-red-500 justify-center items-center rounded px-2 py-1 bg-[rgba(34,80,140,0.10)]">
              {Math.round(
                100 -
                  (packag.price_after_discount / packag.original_price) * 100
              )}
              % OFF
            </span>
          )}
        </div>
      </div>
      {/* Renewal date box */}
      <div className="flex flex-col  w-full items-center lg:items-end justify-center gap-2 mx-auto lg:ml-auto">
        <p className="text-gray-500">
          <span className="font-base  ">
            {remaining} {t("Days To Renew")} ({endDateString})
          </span>
        </p>
        <Link
          href={`/courses/${subscription.package.course_id}/payment/${subscription.package_id}`}
          className="bg-[#017AFD] text-white text-base lg:text-lg rounded-md font-bold w-full lg:w-[277px] h-[56px] flex items-center justify-center"
        >
          {t("Renew subscription")}
        </Link>
        <Button
          // className="bg-[#017AFD] text-white text-base lg:text-lg rounded-md font-bold w-full lg:w-[277px] h-[56px] flex items-center justify-center"
          className="
    relative overflow-hidden
    text-white text-base lg:text-lg
    rounded-md font-bold
    w-full lg:w-[277px] h-[56px]
    flex items-center justify-center
    transition-all duration-300 ease-in-out
    bg-gradient-to-r from-[#017AFD] via-[#0156b0] to-[#017AFD]
    bg-[length:200%_100%]
    animate-[gradientFlow_3s_ease-in-out_infinite]
    hover:scale-105
    active:scale-95
    before:content-['']
    before:absolute
    before:inset-[2px]
    before:rounded-[6px]
    before:opacity-0
    before:transition-opacity
    before:duration-200
    hover:before:opacity-100
    after:content-['']
    after:absolute
    after:inset-0
    after:rounded-md
    after:animate-[pulse_2s_infinite]
    shadow-[0_0_15px_rgba(1,122,253,0.5)]
  "
          onClick={handlePurchaseButton}
        >
          {locale === "en" ? "Upgrade subscription" : "ترقية الإشتراك"}
        </Button>

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
              {/* <h2 className="text-white text-[22px] lg:text-[62px] font-medium leading-[33px] lg:leading-[66px] mb-2">
              {t("ChoosePackage")}
            </h2> */}
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
                  {[...(courses?.data.packages || [])] // Create a new array using spread operator
                    .sort(
                      (a, b) => a.price_after_discount - b.price_after_discount
                    )
                    .map((pkg, idx) => (
                      <SwiperSlide
                        key={idx}
                        className="!w-[306px] !lg:w-[415px]"
                      >
                        <PackageCard course_id={course.id} pkg={pkg} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
