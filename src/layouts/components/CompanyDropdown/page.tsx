"use client";
import { useAuth } from "@/components/page";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";


function useOutsideAlerter(ref: any, setDropdownOpen: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setDropdownOpen]);
}
export const CompanyDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {  logout , userData} = useAuth();
  useOutsideAlerter(dropdownRef, setDropdownOpen);
  const companyName = userData.vendor?.name


  if (!userData) return null;
  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full  py-2  font-Sans font-medium text-gray-700  focus:outline-none capitalize ltr:border-r-2 ltr:pr-2 rtl:border-l-2  rtl:pl-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {/* <Image
            src={team}
            alt="trust-logo"
            width={18}
            height={18}
            className="mx-3"
          /> */}
          <span>{companyName}</span>
          {/* <Image
            src={down}
            alt="trust-logo"
            width={12}
            height={12}
            className="mx-3 mt-[10px]"
          /> */}
        </button>
      </div>

      {dropdownOpen && (
        <div
          className="origin-top-right absolute font-Sans right-0 mt-2 w-[140px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <a
              href={`/dashboard/profile`}
              className="text-gray-700 block pl-6 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              Profile Details
            </a>
            <a
              onClick={logout}
              className="text-gray-700 block pl-6 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              role="menuitem"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDropdown;
