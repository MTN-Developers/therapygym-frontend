import React from "react";
import { Breadcrumb, ConfigProvider, Tabs } from "antd";
import checkIcon from "@/assets/images/CheckCircle.svg";

import starIcon from "@/assets/images/Star.svg";
import clockIcon from "@/assets/images/Clock@2x.svg";
import usersIcon from "@/assets/images/Users.svg";
import notebookIcon from "@/assets/images/Notebook.svg";
import type { TabsProps } from "antd";
import Image from "next/image";

interface IProps {
  items: TabsProps["items"];
  onChange: TabsProps["onChange"];
}

const LeftSideCourseComp = ({ items, onChange }: IProps) => {
  return (
    <div dir="rtl" className="font-[pnu] px-8">
      <div className="mt-4 mb-8 sticky top-[50px] right-4 z-10">
        <ConfigProvider
          theme={{
            components: {
              Breadcrumb: {
                /* here is your component tokens */
                colorText: "blue",
              },
            },
          }}
        >
          <Breadcrumb
            separator=">"
            items={[
              {
                title: "الصفحة الرئيسية",
                href: "/dashboard",
              },
              {
                title: "برامج القيادة الفعالة",
                href: "/dashboard/all-courses",
              },
              {
                title: " حياة الفطرة",
              },
            ]}
          />
        </ConfigProvider>
        <div>
          <h1 className="text-[#353535] font-[pnu] text-[32px] font-bold leading-[160%]">
            تقنية الاتزان العاطفي - المستوى الأساسي
          </h1>
          <p className="w-[607px] text-[rgba(33,33,33,0.60)] text-right font-[pnu] mb-6 text-base font-normal leading-[160%]">
            د. أحمد الدملاوي الطبيب الوحيد في العالم العربي الذي يعتمد في تشخيص
            وعلاج عملائه على منظور علاجي وتدريبي ينبع من تشخيص النفس بالألوان
            وتشخيص{" "}
          </p>
          <div className="flex gap-4 mb-4">
            <p className="flex items-center gap-1">
              <Image src={starIcon} alt="star icon" width={20} height={20} />
              <span className="font-bold">4.8</span>
              (451,444 مقيم)
            </p>
            <p className="flex items-center gap-1">
              <Image src={clockIcon} alt="star icon" width={20} height={20} />4
              أسابيع{" "}
            </p>
            <p className="flex items-center gap-1">
              <Image src={usersIcon} alt="star icon" width={20} height={20} />
              عدد المشتركين 350
            </p>
            <p className="flex items-center gap-1">
              <Image
                src={notebookIcon}
                alt="star icon"
                width={20}
                height={20}
              />
              اللغة العربية
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <p className="text-[color:var(--Neutral-70,#595959)] text-right  text-sm font-medium leading-[22px] tracking-[-0.14px]">
              يقدم بواسطة:
            </p>
            <p className="text-[#017AFD]  text-base font-medium leading-[22px] underline">
              {" "}
              . دكتور أحمد الدملاوي
            </p>
          </div>
        </div>
      </div>
      <div className="-z-20">
        <div className="w-[709px] font-[pnu] lg:mb-20 z-30">
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
        <div className="w-full lg:py-10 lg:px-5 bg-[#f7fbff] rounded-lg">
          <h2 className="text-[#017AFD] text-right font-[pnu] text-2xl font-bold leading-8 tracking-[-0.24px]">
            ما سوف تحصل عليه في نهاية الكورس
          </h2>
          <ul className="py-5">
            <li className="flex items-start gap-3  py-2 mb-4">
              <Image
                src={checkIcon}
                alt="check icon"
                width={25}
                height={25}
                className="relative top-2"
              />
              <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
                قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص
                أو العديد من النصوص إضافة عدد الحروف
              </p>
            </li>
            <li className="flex items-start gap-3  py-2 mb-4">
              <Image
                src={checkIcon}
                alt="check icon"
                width={25}
                height={25}
                className="relative top-2"
              />
              <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
                قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص
                أو العديد من النصوص إضافة عدد الحروف
              </p>
            </li>
            <li className="flex items-start gap-3  py-2 mb-4">
              <Image
                src={checkIcon}
                alt="check icon"
                width={25}
                height={25}
                className="relative top-2"
              />
              <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
                قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص
                أو العديد من النصوص إضافة عدد الحروف
              </p>
            </li>
            <li className="flex items-start gap-3  py-2 mb-4">
              <Image
                src={checkIcon}
                alt="check icon"
                width={25}
                height={25}
                className="relative top-2"
              />
              <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
                قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص
                أو العديد من النصوص إضافة عدد الحروف
              </p>
            </li>
          </ul>
        </div>
        <div className="w-full lg:py-10 lg:px-5 bg-[#f7fbff] rounded-lg">
          <h2 className="text-[#017AFD] text-right font-[pnu] text-2xl font-bold leading-8 tracking-[-0.24px]">
            ما سوف تحصل عليه في نهاية الكورس
          </h2>
          <ul className="py-5">
            <li className="flex items-start gap-3  py-2 mb-4">
              <Image
                src={checkIcon}
                alt="check icon"
                width={25}
                height={25}
                className="relative top-2"
              />
              <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
                قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص
                أو العديد من النصوص إضافة عدد الحروف
              </p>
            </li>
            <li className="flex items-start gap-3  py-2 mb-4">
              <Image
                src={checkIcon}
                alt="check icon"
                width={25}
                height={25}
                className="relative top-2"
              />
              <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
                قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص
                أو العديد من النصوص إضافة عدد الحروف
              </p>
            </li>
            <li className="flex items-start gap-3  py-2 mb-4">
              <Image
                src={checkIcon}
                alt="check icon"
                width={25}
                height={25}
                className="relative top-2"
              />
              <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
                قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص
                أو العديد من النصوص إضافة عدد الحروف
              </p>
            </li>
            <li className="flex items-start gap-3  py-2 mb-4">
              <Image
                src={checkIcon}
                alt="check icon"
                width={25}
                height={25}
                className="relative top-2"
              />
              <p className=" text-[color:var(--White-600,#656565)] font-[pnu] text-base font-medium leading-[160%]">
                قد تم توليد هذا النص من مولد النص حيث يمكنك أن تولد مثل هذا النص
                أو العديد من النصوص إضافة عدد الحروف
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftSideCourseComp;
