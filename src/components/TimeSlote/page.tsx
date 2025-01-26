"use client";

import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";

interface TimeSlotProps {
  time: string;
  date: string;
  id: string;
  IsPaired: boolean;
  pairedAppointmentId?: string;
  availability: {
    totalBooked: number;
    userBooked: boolean;
  };
}

const TimeSlote = ({
  time,
  date,
  id,
  availability,
  IsPaired,
  pairedAppointmentId,
}: TimeSlotProps) => {
  const { totalBooked, userBooked } = availability;
  console.log(availability);

  const { customTrigger: reschedule, isMutating: isRescheduling } =
    useSWRMutationHook(API_SERVICES_URLS.APPOINTMENT_RESCHEDULE(id), "PATCH");

  const { customTrigger: reschedulePair, isMutating: isPairRescheduling } =
    useSWRMutationHook(API_SERVICES_URLS.APPOINTMENT_RESCHEDULE_PAIR, "PATCH");

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const handleClick = async () => {
    if (userBooked) return;

    const startTime = time;
    const endTime = `${parseInt(time.split(":")[0]) + 1}:00`; // Assuming 1-hour duration
    const duration = 60;

    if (IsPaired === true) {
      // Call reschedulePair API for paired bookings
      await reschedulePair({
        appointmentId1: id,
        appointmentId2: pairedAppointmentId,
        startTime,
        endTime,
        duration,
        date,
      });
    } else {
      // Call reschedule API for single booking
      await reschedule({
        startTime,
        endTime,
        duration,
        date,
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      tabIndex={0}
      aria-label={`Select time slot at ${formatTime(time)}`}
      role="button"
      className={`flex items-center rounded-lg shadow-md overflow-hidden w-full cursor-pointer`}
    >
      <div
        className={`${
          userBooked
            ? "bg-[#CFEDFF] pointer-events-none ring-2"
            : "bg-[#C2FDE4]"
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
    </div>
  );
};

export default TimeSlote;
