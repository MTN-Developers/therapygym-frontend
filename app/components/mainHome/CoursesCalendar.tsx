"use client";
import React, { useState } from "react";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";
import { Calendar, Select, theme, Typography } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import Image from "next/image";

import arrowLeft from "@/assets/images/arrow-left.svg";
import arrowRight from "@/assets/images/arrow-right.svg";

// Extend Day.js with the plugins
dayjs.extend(dayLocaleData);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
const CoursesCalender: React.FC = () => {
  const { token } = theme.useToken();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const onSelect = (value: Dayjs) => {
    setSelectedDate(value);
  };
  const goToPreviousMonth = () => {
    setSelectedDate(selectedDate.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setSelectedDate(selectedDate.add(1, "month"));
  };

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle} className="shadow-lg">
      <Calendar
        fullscreen={false}
        onSelect={onSelect} // Handle date selection
        value={selectedDate} // Controlled value
        headerRender={({ value }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          const year = value.year();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div
              style={{ padding: 8 }}
              className="flex  items-center content-center justify-between "
            >
              <Typography.Title level={5} className="m-0">
                {value.format("MMMM")} {year}
              </Typography.Title>
              <div className="flex gap-4 ">
                <div onClick={goToPreviousMonth} className="cursor-pointer">
                  <Image
                    width={10}
                    height={10}
                    src={arrowLeft}
                    onClick={goToPreviousMonth}
                    alt="arrow"
                  />
                </div>
                <div onClick={goToNextMonth} className="cursor-pointer">
                  <Image
                    width={10}
                    height={10}
                    src={arrowRight}
                    onClick={goToPreviousMonth}
                    alt="arrow"
                  />
                </div>
              </div>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default CoursesCalender;
