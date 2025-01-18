"use client"
import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import PaymentTable from "./PaymentTable/page";
import { Search } from "@/components/page";


export const TableList: React.FC = () => {
  const limit = 10; 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const API_SERVICES_URLS = {
    GET_Order_LIST: (page: number,search: string) => {
      const offset = (page - 1) * limit;
      return `/payment?limit=${limit}&offset=${offset}${search ? `&search=${encodeURIComponent(search)}` : ""}`;
    },
  };

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(API_SERVICES_URLS.GET_Order_LIST(currentPage,searchTerm));

  useEffect(() => {
    mutate();
  }, [currentPage, mutate ,searchTerm]); 

  return (
    <div className="max-w-[820px] bg-white p-3">
       <div className="max-w-[400px] py-5">
        <Search setSearch={setSearchTerm} />
      </div>
      <hr />
      <div className="bg-lightSecondary rounded-[15px]">
        <PaymentTable
          leadResponseData={leadResponseData}
          isLoadingLeads={isLoadingLeads}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default TableList;
