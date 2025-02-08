"use client";

import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import { Search } from "@/components/page";

import AppointmentTable from "./components/AppointmentTable/page";
import FilterDropDown from "../Appointments/components/FilterDropDown/page";

export const TableList: React.FC<{ formattedDate: string }> = ({ formattedDate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaired, setIsPaired] = useState<string>(""); // Empty = No filter

  const API_SERVICES_URLS = {
    GET_Products_LIST: (search: string, isPaired?: string) => {
      let url = `/appointment?limit=100&date=${formattedDate}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (isPaired) url += `&isPaired=${isPaired}`;
      return url;
    },
  };

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(API_SERVICES_URLS.GET_Products_LIST(searchTerm, isPaired));

  useEffect(() => {
    mutate();
  }, [searchTerm, isPaired, mutate]);

  return (
    <div className="bg-white rounded-[15px] p-4 relative w-[600px] md:w-[800px] lg:w-[1000px]">
      <div className="flex justify-between gap-4 items-center mb-4">
        <Search setSearch={setSearchTerm} />
        <FilterDropDown isPaired={isPaired} setIsPaired={setIsPaired} />
      </div>

      <AppointmentTable
        leadResponseData={leadResponseData}
        isLoadingLeads={isLoadingLeads}
        mutate={mutate}
      />
    </div>
  );
};

export default TableList;
