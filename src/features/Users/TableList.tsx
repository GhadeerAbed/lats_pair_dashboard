"use client";

import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import { UserTable } from "./components/page";
import { Button, Search } from "@/components/page";
import { useRouter } from "next/navigation";
import FilterDropDown1 from "./components/FilterDropDown1/page";


export const TableList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConsented, setIsConsented] = useState<string>("");
  const [isEmailVerified, setIsEmailVerified] = useState<string>("");
  const router = useRouter();
  
  const API_SERVICES_URLS = {
    GET_Products_LIST: (search: string) => {
      let url = `/users?limit=100`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (isConsented) url += `&isConsented=${isConsented}`;
      if (isEmailVerified) url += `&isEmailVerified=${isEmailVerified}`;
      return url;
    },
  };

  const {
    data: leadResponseData,
    isLoading: isLoadingLeads,
    mutate,
  } = useSWRHook(API_SERVICES_URLS.GET_Products_LIST(searchTerm));

  useEffect(() => {
    mutate();
  }, [searchTerm, mutate]);

  const handleAddUser = () => {
    router.push("/dashboard/users/addUsers");
  };

  return (
    <div className="bg-white rounded-[15px] w-full p-4">
      <div className="flex justify-between gap-4 items-center mb-4">
        <Search setSearch={setSearchTerm} />
        <Button className="bg-primary text-white px-6 py-2" onClick={handleAddUser}>
          Add User
        </Button>
        <FilterDropDown1 isConsented={isConsented} setIsConsented={setIsConsented} isEmailVerified={isEmailVerified} setIsEmailVerified={setIsEmailVerified}/>
      </div>
      <UserTable leadResponseData={leadResponseData} isLoadingLeads={isLoadingLeads} mutate={mutate} />
    </div>
  );
};

export default TableList;
