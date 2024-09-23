"use client";
import React, { useState } from "react";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

import { Calendar, Select, theme, Typography } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";

dayjs.extend(dayLocaleData);

// const dateCellRender = (currentDate: Dayjs, selectedDate: Dayjs) => {
// const isSelected = currentDate.isSame(selectedDate, "day");

// return (
//     <div
//     className={`w-full h-full flex items-center justify-center ${
//         isSelected ? "bg-red-500 text-white rounded-full" : ""
//     }`}
//     >
//     {currentDate.date()}
//     </div>
// );
// };

const CoursesCalender: React.FC = () => {
  const { token } = theme.useToken();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const onSelect = (value: Dayjs) => {
    setSelectedDate(value);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  //   const date = new Date()

  return (
    <div style={wrapperStyle} className="shadow-lg">
      <Calendar
        fullscreen={false}
        onSelect={onSelect} // Handle date selection
        value={selectedDate} // Controlled value
        // dateCellRender={(value) => dateCellRender(value, selectedDate)}
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
          // const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }
          return (
            <div style={{ padding: 8 }}>
              <Typography.Title level={4}>
                {value.format("MMMM")} {year}
              </Typography.Title>
              {/* <Row gutter={8}>
                <Col>
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row> */}
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default CoursesCalender;
