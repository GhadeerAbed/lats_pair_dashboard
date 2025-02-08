"use client";

import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import {  Search } from "@/components/page";

import AppointmentTable from "./components/AppointmentTable/page";
import FilterDropDown from "../Appointments/components/FilterDropDown/page";

export const TableList: React.FC<{ formattedDate: string }> = ({
  formattedDate,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaired, setIsPaired] = useState<string>(""); // Empty = No filter


  const DEFAULT_PAGE_SIZE = 10;

  const API_SERVICES_URLS = {
    GET_Products_LIST: (
      page: number,
      search: string,
      limit: number = DEFAULT_PAGE_SIZE,
      isPaired?: string
    ) => {
      let url = `/appointment?page=${page}&limit=${limit}&date=${formattedDate}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (isPaired) url += `&isPaired=${isPaired}`;
      return url;
    },
  };

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(
    API_SERVICES_URLS.GET_Products_LIST(
      currentPage,
      searchTerm,
      DEFAULT_PAGE_SIZE,
      isPaired
    )
  );

  useEffect(() => {
    mutate();
  }, [currentPage, searchTerm, isPaired, mutate,DEFAULT_PAGE_SIZE]);

  return (
    <div className="bg-white rounded-[15px] p-4 relative w-[600px] md:w-[800px] lg:w-[1000px]">
      <div className="flex justify-between gap-4 items-center mb-4">
        <Search setSearch={setSearchTerm} />
        <FilterDropDown isPaired={isPaired} setIsPaired={setIsPaired} />
      </div>

      <AppointmentTable
        leadResponseData={leadResponseData}
        isLoadingLeads={isLoadingLeads}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        mutate={mutate}
      />
    </div>
  );
};

export default TableList;
