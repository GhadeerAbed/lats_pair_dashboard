"use client";

import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import { BigModal, Button, Search } from "@/components/page";
import { ViewIcon } from "@/lib/@heroicons/page";
import AppointmentTable from "@/features/Dashboard/components/AppointmentTable/page";
import BookSessionForm from "../BookSessionForm/page";
import { useRouter } from "next/navigation";

export const ShowAppoitmentTable: React.FC = ({ id }: { id?: any }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const DEFAULT_PAGE_SIZE = 10;
  const router = useRouter()

  const API_SERVICES_URLS = {
    GET_Products_LIST: (
      page: number,
      search: string,
      limit: number = DEFAULT_PAGE_SIZE
    ) => {
      return `/appointment?page=${page}&limit=${limit}&searchkey=name${
        search ? `&search=${encodeURIComponent(search)}` : ""
      }`;
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
        <div className="flex justify-between items-center mb-4">
          <Search setSearch={setSearchTerm} />
          <div className="flex gap-2">
            <Button className="text-primary bg-white border-none flex">
              <ViewIcon className="w-5 h-5" />
              <span className="font-medium pl-1">Filter</span>
            </Button>
            <Button
              className="bg-primary text-white px-6 py-2"
              onClick={()=>router.push(`/dashboard/users/${id}/booking`)}
            >
              Book Now
            </Button>
          </div>
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
