"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IEvent } from "@/interfaces";

interface IProps {
  events: IEvent[] | undefined;
}

moment.locale("ar"); // Set moment locale to Arabic
const localizer = momentLocalizer(moment);

const CalendarComp = ({ events }: IProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Custom messages for Arabic localization
  const messages = {
    allDay: "طوال اليوم",
    previous: "السابق",
    next: "التالي",
    today: "اليوم",
    month: "شهر",
    week: "أسبوع",
    day: "يوم",
    agenda: "جدول",
    date: "تاريخ",
    time: "وقت",
    event: "حدث",
    noEventsInRange: "لا توجد أحداث في هذا النطاق.",
    showMore: (total: number) => `+${total} أحداث أخرى`,
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <Calendar
        localizer={localizer}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        defaultView={Views.MONTH}
        events={events}
        className="bg-white rounded-lg shadow"
        style={{ height: "80vh" }}
        messages={messages}
        culture="ar"
      />
    </div>
  );
};

export default CalendarComp;
