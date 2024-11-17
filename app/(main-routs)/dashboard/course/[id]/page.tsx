// app/course/[id]/page.tsx

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spin } from "antd";
import type { SingleCourse as Course } from "@/interfaces"; // Adjust the import path
import Image from "next/image";

import strokGroup from "@/assets/images/Group 754.png";
import strokOne from "@/assets/images/Pattern.png";
import strokTwo from "@/assets/images/Pattern-1.png";
import RightSideCourseComp from "@/app/components/course/RightSideCourseComp";
import type { TabsProps } from "antd";
import LeftSideCourseComp from "@/app/components/course/LeftSideCourseComp";

const fetchCourse = async (id: string): Promise<Course> => {
  const { data } = await axios.get<Course>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/getCourse/${id}`
  );
  return data;
};

const Page: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span style={{ marginInline: 16 }}>عن الكورس</span>,
      children: (
        <div>
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            عن الكورس
          </h2>
          <p className="w-[701px] mt-4 text-[#656565] text-right font-[pnu] text-base font-normal leading-[160%]">
            لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
            النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى
            يولدها التطبيق لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك
            أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
            الحروف التى يولدها التطبيق. لقد تم توليد هذا النص من ....{" "}
            <span className="text-blue-500 font-bold cursor-pointer">
              قرأة المزيد
            </span>
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: "عن المحاضر",
      children: (
        <div>
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            عن المحاضرة
          </h2>
          <p className="w-[701px] mt-4 text-[#656565] text-right font-[pnu] text-base font-normal leading-[160%]">
            لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
            النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى أن
            تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد
            الحروف التى يولدها التطبيق. لقد تم توليد هذا النص من ....{" "}
            <span className="text-blue-500 font-bold cursor-pointer">
              قرأة المزيد
            </span>
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: "أراء العملاء",
      children: (
        <div>
          <h2 className="text-[#007AFE] text-start font-[pnu] text-2xl font-bold leading-8 mt-8 tracking-[-0.24px]">
            أراء العملاء{" "}
          </h2>
          <p className="w-[701px] mt-4 text-[#656565] text-right font-[pnu] text-base font-normal leading-[160%]">
            لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
            النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى
            يولدها التطبيق لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك
            النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى
            الحروف التى يولدها التطبيق. لقد تم توليد هذا النص من ....{" "}
            <span className="text-blue-500 font-bold cursor-pointer">
              قرأة المزيد
            </span>
          </p>
        </div>
      ),
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery<Course, Error>({
    queryKey: ["single course", id],
    queryFn: () => fetchCourse(id),
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Error: {error?.message}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>No course data available.</p>
      </div>
    );
  }

  return (
    <div dir="rtl" className="flex w-full relative p-[39px] pl-0 pb-0">
      <div className="fixed bg-[#f7fbff] w-full z-10 lg:h-[300px] top-0 left-0 pointer-events-none"></div>
      <Image
        src={strokGroup}
        alt="stroke"
        width={800}
        height={800}
        className="fixed z-10 top-0 pointer-events-none right-0 w-[900px]"
      />
      <Image
        src={strokOne}
        alt="stroke"
        width={800}
        height={800}
        className="fixed z-10 top-40 pointer-events-none  left-[268px] w-[180px]"
      />
      <Image
        src={strokTwo}
        alt="stroke"
        width={800}
        height={800}
        className="fixed top-12 z-10 pointer-events-none left-[176px] w-[180px]"
      />
      <RightSideCourseComp course={course} />
      <LeftSideCourseComp items={items} onChange={onChange} />
    </div>
  );
};

export default Page;
