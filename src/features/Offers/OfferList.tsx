"use client";
import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import { OfferTable } from "./Components/page";



export const OfferList = () => {
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);


  const API_SERVICES_URLS = {
    GET_Order_LIST: (page: number) => {
      const offset = (page - 1) * limit;
      return `/vendor/offers?limit=${limit}&offset=${offset}`;
    },
  };

  const { data: leadResponseData, isLoading: isLoadingLeads, mutate } = useSWRHook(API_SERVICES_URLS.GET_Order_LIST(currentPage));

  useEffect(() => {
    mutate();
  }, [currentPage, mutate]);

 

  return (
    <div className="bg-white rounded-[15px] mt-5">
        <OfferTable
          leadResponseData={leadResponseData}
          isLoadingLeads={isLoadingLeads}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
  );
};

export default OfferList;
//upate

