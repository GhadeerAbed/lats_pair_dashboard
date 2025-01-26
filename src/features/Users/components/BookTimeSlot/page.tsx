"use client"
import { useState } from "react";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import { BigModal } from "@/components/page";
import BookSessionForm from "../BookSessionForm/page";

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

export const BookTimeSlot = ({
  time,
  date,
  id,
  availability,
}: TimeSlotProps) => {
  const { totalBooked, userBooked } = availability;

  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle modal visibility

  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_APPOINTMENT,
    "POST"
  );

  const { customTrigger: createPairAppointment, isMutating: isLoadingAppointment } =
    useSWRMutationHook(API_SERVICES_URLS.CREATE_PAIR_APPOINTMENT, "POST");

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const handleClick = () => {
    if (userBooked) return;

    // Open the modal when slot is clicked
    setIsModalOpen(true);
  };

  const handleSubmit = async (sessionType: string, pairId?: string) => {
    const commonData = {
      userId: id,
      startTime: time,
      endTime: `${parseInt(time.split(":")[0]) + 1}:00`, // Assuming 1-hour duration
      duration: 60,
      date: date,
    };

    if (sessionType === "ALONE") {
      await customTrigger(commonData);
    } else if (sessionType === "PAIR") {
      const pairData = {
        ...commonData,
        pairId: Number(pairId),
        isPaired: true,
      };
      await createPairAppointment(pairData);
    }

    // Close the modal after submission
    setIsModalOpen(false);
  };

  return (
    <>
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

      {/* Modal for booking session */}
      <BigModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <BookSessionForm id={id} onSubmit={handleSubmit} />
      </BigModal>
    </>
  );
};

export default BookTimeSlot;
