"use client";
import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import { OrderTable } from "./components/page";
import { Search } from "@/components/page";

export const TableList: React.FC = () => {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const API_SERVICES_URLS = {
    GET_Order_LIST: (page: number) => {
      const offset = (page - 1) * limit;
      return `/vendor/orders?limit=${limit}&offset=${offset}`;
    },
  };

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
  } = useSWRHook(API_SERVICES_URLS.GET_Order_LIST(currentPage));

  return (
    <div className=" bg-white rounded-[15px] mt-5">
        <OrderTable
          leadResponseData={leadResponseData}
          isLoadingLeads={isLoadingLeads}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
    </div>
  );
};

export default TableList;
//test

