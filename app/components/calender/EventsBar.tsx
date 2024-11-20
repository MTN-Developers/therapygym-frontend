"use client";

import { IEvent } from "@/interfaces";
import React, { useState } from "react";

interface IProps {
  events: IEvent[] | undefined;
  error: Error | null;
  isLoading: boolean;
}

const EventsBar = ({ events, error, isLoading }: IProps) => {
  const [colors] = useState([
    {
      back: "#4bafe9",
      front: "#e1f9ff",
    },
    {
      back: "#e43838",
      front: "#ffdcdc",
    },
    {
      back: "#5ebfba",
      front: "#d4fffd",
    },
    {
      back: "#b08943",
      front: "#fff4e0",
    },
  ]);

  return (
    <div className="lg:w-[195px] p-4 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold  ">Events</h1>
      <ul className="h-[525px] overflow-y-scroll overscroll-x-none hide-scrollbar ">
        {isLoading && (
          <>
            <p>Loading</p>
          </>
        )}
        {error && (
          <>
            <p>{error.message}</p>
          </>
        )}
        {events &&
          events.map((event, idx) => {
            const color = colors[idx % colors.length];
            return (
              <li key={event.id} className=" my-2 mx-1 ">
                <div
                  className={`rounded-lg `}
                  style={{
                    backgroundColor: color.back,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: color.front,
                      color: color.back,
                    }}
                    className={`relative flex flex-col gap-2 left-1  px-4 py-1 rounded-lg `}
                  >
                    <h2 className="font-bold">{event.title}</h2>
                    <p>{event.date}</p>
                    <a href={event.url} className="font-bold">
                      URL
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default EventsBar;
