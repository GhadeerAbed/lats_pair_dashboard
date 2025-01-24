"use client";

import { useState } from "react";
interface TimeSlotProps {
  time: string;
  date: string;
  availability: {
    totalBooked: number;
    userBooked: boolean;
  };
}


const TimeSlote = ({ time, date, availability }: TimeSlotProps) => {
  const { totalBooked, userBooked } = availability;
  const [open, setOpen] = useState(false);

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };
  return (
    <div
      onClick={() => {
        if (!userBooked) setOpen(true);
      }}
      tabIndex={0}
      aria-label={`Select time slot at ${formatTime(time)}`}
      role="button"
      className={`flex items-center rounded-lg  shadow-md overflow-hidden w-full `}
    >
      <div
        className={` ${
          userBooked
            ? "bg-[#CFEDFF] pointer-events: none ring-2"
            : "bg-[#C2FDE4] cursor-pointer"
        } rounded-l-lg w-24 h-[55px] text-sm font-medium p-4 flex items-center justify-center`}
      >
        {formatTime(time)}
      </div>
      <div
        className={`${
          userBooked ? "bg-[#77CDFF]" : "bg-green-500"
        } text-center flex-1 h-[55px] text-sm font-medium p-4 flex items-center justify-center`}
      >
        {`${totalBooked} / 20 Slots`}
      </div>
{/* 
      <Popup onClose={() => setOpen(false)} width="small" isOpen={open}>
        <BookSession time={time} date={date} />
      </Popup> */}
    </div>
  );
};

export default TimeSlote;
