import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useSWR from "swr";
import { endpoints } from "@/services/endpoints";
import { getOne } from "@/services/server";
import { SearchResponse } from "@/types/searchResult";
import Link from "next/link";
import Image from "next/image";
import { Spin, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useTranslationContext } from "@/contexts/TranslationContext";

const SearchPage = () => {
  const { searchTerm } = useSelector((state: RootState) => state.searchSlice);
  const t = useTranslations("Home");
  const { locale } = useTranslationContext();

  const { data, isLoading } = useSWR<SearchResponse>(
    endpoints.searchEndpoint(searchTerm),
    getOne
  );

  console.log("searched data is ", data);

  return (
    <div>
      <h1 className="font-bold text-2xl text-gray-600 my-4">Search Results</h1>

      {isLoading && <Spin />}

      {!isLoading && data?.data?.data?.length > 0 && (
        <>
          <div className="flex gap-4 flex-wrap justify-start items-start">
            {data.data.data.map((course, idx) => (
              <div key={idx} className="!w-[217px] !h-[300px]">
                <Link
                  href={`/courses/${course.id}`}
                  className="relative h-full flex flex-col items-center cursor-pointer shadow-none w-full bg-gray-50  rounded-lg"
                >
                  <div className=" flex justify-center w-full bg-white rounded-t-lg  ">
                    <Image
                      src={course.banner_ar ?? ""}
                      width={217}
                      height={150}
                      alt="course image"
                      className="w-[217px] h-[150px] object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="w-full p-2">
                    <h2 className="w-full text-[#636363] text-start font-poppins text-sm font-semibold leading-[20.26px]">
                      {course.category || "Course Status"}
                    </h2>
                    <Tooltip
                      title={locale == "ar" ? course.name_ar : course.name_en}
                    >
                      <h2 className=" text-[#353535] text-start font-[pnu]  text-base font-bold mb-2 leading-[160%]">
                        {locale == "ar" ? course.name_ar : course.name_en}
                      </h2>
                    </Tooltip>

                    {t("DrAhmed")}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
