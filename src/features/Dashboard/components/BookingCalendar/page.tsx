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
import { getAuthData } from "@/utils/page";
import TableList from "../../TableList";

export const BookingCalendar = () => {
  const today = startOfDay(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const authUser = getAuthData();

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

  const isDateSelected = (date: Date) => {
    return format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
  };

  const isPrevDisabled =
    isSameDay(startDate, today) || isBefore(startDate, today);

  // Format date for API request
  const formattedDate = format(selectedDate, "dd-MM-yyyy");

  // // Fetch availability data using useSWRHook
  // const { data } = useSWRHook(
  //   `${API_SERVICES_URLS.GET_AVAILABILITY_APPOINTMENT}?date=${formattedDate}`
  // );

  // const formattedSelectedDate = format(selectedDate, "dd MMMM yyyy");

  return (
    <div className="flex flex-col text-sm lg:text-base  py-6">
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold pb-5">Select Date To Show Appointment</h2>
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
          <div className="flex  border rounded w-full max-w-[850px] text-center">
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
        {/* <div className="border mt-10"></div>
        <h3 className="my-5">Date: {formattedSelectedDate}</h3> */}
      </div>
      <TableList formattedDate={formattedDate} />
    </div>
  );
};

export default BookingCalendar;
