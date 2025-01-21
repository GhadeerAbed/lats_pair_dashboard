"use client";

import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import { UserTable } from "./components/page";
import { Button, Search } from "@/components/page";
import { ViewIcon } from "@/lib/@heroicons/page";
import { useRouter } from "next/navigation";

export const TableList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const DEFAULT_PAGE_SIZE = 10;
  const router = useRouter();
  const API_SERVICES_URLS = {
    GET_Products_LIST: (
      page: number,
      search: string,
      limit: number = DEFAULT_PAGE_SIZE
    ) => {
      const searchKey = search.includes("@") ? "email" : "name";
      return `/users?page=${page}&limit=${limit}&searchkey=${searchKey}${
        search ? `&search=${encodeURIComponent(search)}` : ""
      }`;
    },
  };

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(API_SERVICES_URLS.GET_Products_LIST(currentPage, searchTerm));

  useEffect(() => {
    mutate();
  }, [currentPage, searchTerm, mutate]);

  const handleAddUser = () => {
    router.push("/dashboard/users/addUsers");
  };

  return (
    <div className="bg-white rounded-[15px] w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <Search setSearch={setSearchTerm} />
        <div className="flex gap-2">
          <Button
            className="text-primary bg-white border-none flex"
            onClick={() => console.log("Filter clicked")}
          >
            <ViewIcon className="w-5 h-5" />
            <span className="font-medium pl-1">Filter</span>
          </Button>
          <Button
            className="bg-primary text-white px-6 py-2"
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </div>
      </div>
      <UserTable
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
