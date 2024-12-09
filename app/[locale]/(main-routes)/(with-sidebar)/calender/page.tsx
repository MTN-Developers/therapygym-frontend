"use client";

import CalendarComp from "@/app/components/calender/CalenderComp";
import EventsBar from "@/app/components/calender/EventsBar";
// import CalenderComp from "@/app/components/calender/CalenderComp";
// import CustomHeader from "@/app/components/CustomHeader";
import { IEvent } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Page: React.FC = () => {
  //handlers
  const fetchEvents = async (): Promise<IEvent[]> => {
    const { data } = await axios.get<IEvent[]>("http://localhost:3001/events");
    return data;
  };

  const {
    data: events,
    error,
    isLoading,
  } = useQuery<IEvent[], Error>({
    queryKey: ["events"],
    queryFn: () => fetchEvents(),
  });

  // Map events to include 'start' and 'end' as Date objects
  const mappedEvents =
    events?.map((event) => ({
      ...event,
      start: new Date(event.date),
      end: new Date(event.date),
    })) || [];

  const currentDate = new Date();

  const monthFormatter = new Intl.DateTimeFormat("ar", { month: "long" });
  const yearFormatter = new Intl.DateTimeFormat("ar", { year: "numeric" });

  const month = monthFormatter.format(currentDate);
  const year = yearFormatter.format(currentDate);

  return (
    <div className="bg-white p-6 min-h-screen">
      <div className=" w-full ">{/* <CustomHeader /> */}</div>
      <h1 className="my-4 text-[color:var(--Text-text-black-primary,#1D1D1D)] [font-feature-settings:'liga'_off,'clig'_off] [font-family:PNU] text-2xl font-bold leading-[110%] ">
        {month} <span className="font-light">{year}</span>
      </h1>
      <div className="flex gap-4 justify-start ">
        <EventsBar events={mappedEvents} error={error} isLoading={isLoading} />
        <div className="flex-1">
          <CalendarComp events={mappedEvents} />
        </div>
      </div>
    </div>
  );
};

export default Page;
