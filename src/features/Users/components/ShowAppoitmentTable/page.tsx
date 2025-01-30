"use client";

import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import { Button, Search } from "@/components/page";
import { ViewIcon } from "@/lib/@heroicons/page";
import AppointmentTable from "@/features/Dashboard/components/AppointmentTable/page";
import { useRouter } from "next/navigation";
import FilterDropDown from "@/features/Appointments/components/FilterDropDown/page";

export const ShowAppoitmentTable: React.FC = ({ id }: { id?: any }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPaired, setIsPaired] = useState<string>("");

  const DEFAULT_PAGE_SIZE = 10;
  const router = useRouter()

  const API_SERVICES_URLS = {
    GET_Products_LIST: (
      page: number,
      search: string,
      limit: number = DEFAULT_PAGE_SIZE
    ) => {
      let url = `/appointment?page=${page}&limit=${limit}`;
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
    API_SERVICES_URLS.GET_Products_LIST(currentPage, searchTerm, id)
  );

  useEffect(() => {
    mutate();
  }, [currentPage, searchTerm, mutate]);

  return (
    <>
      <div className="bg-white rounded-[15px] w-full p-4 my-10 shadow-md">
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
    </>
  );
};

export default ShowAppoitmentTable;
