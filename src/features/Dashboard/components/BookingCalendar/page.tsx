"use client";

import React, { useState } from "react";
import {
  format,
  addDays,
  subDays,
  isBefore,
  startOfDay,
  isSameDay,
} from "date-fns";
import Image from "next/image";
import TableList from "../../TableList";
import TimeSlote from "@/components/TimeSlote/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";

export const BookingCalendar = ({ id }: { id?: any }) => {
  const today = startOfDay(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const generateWeek = (start: Date) => {
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const weekDates = generateWeek(startDate);

  const handlePrev = () => {
    const newStartDate = subDays(startDate, 7);
    if (!isBefore(newStartDate, today)) {
      setStartDate(newStartDate);
    }
  };

  const handleNext = () => {
    setStartDate(addDays(startDate, 7));
  };

  const isDateSelected = (date: Date) =>
    format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

  const isPrevDisabled =
    isBefore(startDate, today) || isSameDay(startDate, today);

  const formattedDate = format(selectedDate, "dd-MM-yyyy");
  const App_id = localStorage.getItem("APP_Id");

  // Ensure API URL is only set when id is present
  const apiUrl =
    id &&
    `${
      API_SERVICES_URLS.GET_AVAILABILITY_APPOINTMENT
    }?date=${encodeURIComponent(formattedDate)}&userId=${App_id}`;

  const { data } = useSWRHook(apiUrl);

  const { data: slotData } = useSWRHook(API_SERVICES_URLS.GET_APPOINTMENT(id));

  return (
    <div className="flex flex-col text-sm lg:text-base py-6">
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold pb-5">
          Select Date To Show Appointment
        </h2>
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={isPrevDisabled}
            className={`lg:m-3 p-2 ${
              isPrevDisabled
                ? "cursor-not-allowed text-gray-400"
                : "cursor-pointer text-blue-600"
            }`}
          >
            <Image
              src="/previos.svg"
              width={20}
              height={20}
              alt="Previous button"
              className="inline-block"
            />
          </button>
          <div className="flex border rounded w-full max-w-[850px] text-center">
            {weekDates.map((date, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDate(date)}
                className={`lg:p-3 p-1 w-full rounded ${
                  isDateSelected(date)
                    ? "bg-[#77CDFF]"
                    : "bg-slate-50 hover:bg-blue-100 text-gray-800"
                }`}
              >
                <div className="mb-2">{format(date, "EEE")}</div>
                <div>{format(date, "dd MMM")}</div>
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="lg:m-3 p-2 cursor-pointer text-blue-600"
          >
            <Image
              src="/next.svg"
              width={20}
              height={20}
              alt="Next button"
              className="inline-block"
            />
          </button>
        </div>
      </div>
      {!id ? (
        <TableList formattedDate={formattedDate} />
      ) : (
        <>
          <h2 className=" text-lg">Select Time Slot</h2>
          <div className="grid grid-cols-2 gap-5 w-full max-w-[800px] mx-auto mt-5">
            {data &&
              Object.entries(data).map(([time, availability]) => (
                <TimeSlote
                  id={id}
                  pairedAppointmentId={slotData?.pairedAppointmentId}
                  IsPaired={slotData?.isPaired}
                  key={`${time}-${formattedDate}`}
                  date={formattedDate}
                  time={time}
                  availability={availability}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BookingCalendar;
