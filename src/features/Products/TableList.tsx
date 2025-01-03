"use client"
import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import { ProductTable } from "./components/page";




export const TableList: React.FC = () => {
  const limit = 10; 
  const [currentPage, setCurrentPage] = useState(1);

  const API_SERVICES_URLS = {
    GET_Products_LIST: (page: number) => {
      const offset = (page - 1) * limit;
      return `/vendor/products?limit=${limit}&offset=${offset}`;
    },
  };

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(API_SERVICES_URLS.GET_Products_LIST(currentPage));

  useEffect(() => {
    mutate();
  }, [currentPage, mutate]); 

  return (
      <div className="bg-lightSecondary rounded-[15px]">
        <ProductTable
          leadResponseData={leadResponseData}
          isLoadingLeads={isLoadingLeads}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
    </div>
  );
};

export default TableList;
