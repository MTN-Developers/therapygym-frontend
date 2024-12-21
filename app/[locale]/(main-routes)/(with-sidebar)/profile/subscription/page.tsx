"use client";

import { getOne } from "@/services/server";
import { SubscriptionApiResponse, Subscription } from "@/types/packages";
import { Spin } from "antd";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const Page = () => {
  // Fetch data using SWR and your `getOne` service
  const {
    data: subscriptionData,
    isLoading,
    error,
  } = useSWR<SubscriptionApiResponse>("/user-package/me", getOne);

  // Extract the subscriptions array (called `data` in your API)
  const mySubscriptions = subscriptionData?.data;

  return (
    <div className="p-4 w-full">
      <h2 className="text-[#164194] mb-4 text-2xl lg:text-4xl font-bold leading-normal">
        Subscription
      </h2>
      <h3 className="text-[#15162c] mb-4 text-2xl lg:text-3xl font-bold leading-normal">
        Active plans
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
  const { end_date } = subscription;
  const packag = subscription.package; // The "package" object within subscription
  const course = packag.course; // The "course" object within package

  // Calculate remaining days
  const now = new Date();
  const endDate = new Date(end_date);
  const differenceMs = endDate.getTime() - now.getTime();
  const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  const remaining = differenceDays > 0 ? differenceDays : 0; // Don't show negative days
  const endDateObj = new Date(end_date);

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
      <div className="lg:w-[180px] lg:h-[123px]  h-[192px] rounded-sm shadow-sm overflow-hidden">
        <Image
          src={course?.banner_en || ""}
          alt={course?.name_en || "Course Banner"}
          width={180}
          height={123}
          className="object-cover w-full h-full rounded-sm shadow-sm"
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
          {packag?.name_en}
        </p>
        <p className="text-[#636363] text-right [font-family:PNU] text-[15px] font-bold leading-[160%]">
          {course?.name_en}
        </p>

        {/* Price and discount */}
        <div className="flex items-center gap-1">
          <span className="line-through w-11 shrink-0 text-base font-normal leading-6 text-gray-500">
            ${course?.original_price}
          </span>
          <span className="text-2xl font-bold leading-8 text-gray-900">
            ${course?.price_after_discount}
          </span>
          {/* Calculate discount percentage */}
          {course?.original_price && course?.price_after_discount && (
            <span className="flex ml-10 text-xs text-red-500 justify-center items-center rounded px-2 py-1 bg-[rgba(34,80,140,0.10)]">
              {Math.round(
                100 -
                  (course.price_after_discount / course.original_price) * 100
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
            {remaining} Days To Renew ({endDateString})
          </span>
        </p>
        <button className="bg-[#017AFD] text-white text-base lg:text-lg rounded-md font-bold w-full lg:w-[277px] h-[56px] flex items-center justify-center">
          Renew subscription
        </button>
      </div>
    </div>
  );
};
