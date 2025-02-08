"use client";

import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import { Button, Search } from "@/components/page";
import AppointmentTable from "@/features/Dashboard/components/AppointmentTable/page";
import { useRouter } from "next/navigation";
import FilterDropDown from "@/features/Appointments/components/FilterDropDown/page";
import { API_SERVICES_URLS } from "@/data/page";

export const ShowAppointmentTable: React.FC<{ id?: any }> = ({ id }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaired, setIsPaired] = useState<string>("");

  const router = useRouter();

  const { data: user } = useSWRHook(API_SERVICES_URLS.USERPREF(id));
    const user_id = user?.id

  const API_SERVICES_URLS1 = {
    GET_APPOINTMENTS_LIST: (
      search: string,
    ) => {
      let url = `/appointment/${user_id}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (isPaired) url += `&isPaired=${isPaired}`;
      return url;
    },
  };

  // Ensure the API call includes DEFAULT_PAGE_SIZE instead of id
  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(API_SERVICES_URLS1.GET_APPOINTMENTS_LIST( searchTerm));

  useEffect(() => {
    mutate();
  }, [searchTerm, isPaired, id]); // ✅ Correct dependencies

  return (
    <div className="bg-white rounded-[15px] w-full p-4 my-10 shadow-md">
      <div className="flex justify-between gap-4 items-center mb-4">
        <Search setSearch={setSearchTerm} />
        <FilterDropDown isPaired={isPaired} setIsPaired={setIsPaired} />
        <Button
          className="bg-primary text-white px-6 py-2"
          onClick={() => router.push(`/dashboard/users/${id}/booking`)}
        >
          Book Now
        </Button>
      </div>
      <AppointmentTable
        leadResponseData={leadResponseData}
        isLoadingLeads={isLoadingLeads}
        mutate={mutate}
      />
    </div>
  );
};

export default ShowAppointmentTable;
