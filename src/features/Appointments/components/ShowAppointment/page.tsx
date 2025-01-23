"use client";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import React from "react";

export const ShowAppointment = ({ id }: { id: string }) => {
  const { data } = useSWRHook(API_SERVICES_URLS.GET_APPOINTMENT(id));

  if (!data) return <p>Loading...</p>;

  // Convert date to a more readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr.split("-").reverse().join("-"));
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Date Box */}
      <div className="flex items-center space-x-4">
        <div className="bg-primary text-white p-4 text-center rounded-md w-24">
          <p className="text-lg font-semibold">{data.date.split("-")[0]}</p>
          <p className="text-sm">
            {/* {formatDate(data.date).split(" ")[1]}{" "} */}
            {formatDate(data.date).split(" ")[2]}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-primary">#{id}</h2>
          <p className="text-sm text-gray-500 py-1">
            Created: {new Date(data.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Last Update: {new Date(data?.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-500">Start Time</p>
            <p className="font-semibold">{data.startTime}</p>
          </div>
          <div>
            <p className="text-gray-500">End Time</p>
            <p className="font-semibold">{data.endTime}</p>
          </div>
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-semibold">{data.duration} minutes</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-gray-500">User</p>
            <p className="font-semibold">{data.user?.name}</p>
          </div>
          <div>
            <p className="text-gray-500">User ID</p>
            <p className="font-semibold">#{data.user?.id}</p>
          </div>
          <div>
            <p className="text-gray-500">Is Paired</p>
            <p
              className={`font-semibold ${
                data.isPaired ? "text-green-500" : "text-red-500"
              }`}
            >
              {data.isPaired ? "True" : "False"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-gray-500">Pair With</p>
            <p className="font-semibold">
              {data.pairedAppointmentId
                ? `#${data.pairedAppointmentId}`
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Payment Status</p>
            <p
              className={`font-semibold ${
                data.paymentStatus === "PAID"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {data.paymentStatus}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Deleted For</p>
            <p
              className={`font-semibold ${
                data.deletedFor === "NA" ? "text-gray-500" : "text-red-500"
              }`}
            >
              {data.deletedFor}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-500">Feedback</p>
          <p className="font-semibold">
            {data.feedback || "No feedback provided"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="border border-primary text-primary px-4 py-2 rounded-md">
          Reschedule
        </button>
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ShowAppointment;
