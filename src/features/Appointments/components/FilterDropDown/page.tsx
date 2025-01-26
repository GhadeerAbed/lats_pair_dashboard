"use client";
import { ViewIcon } from "@/lib/@heroicons/page";
import React, { useState, useRef, useEffect } from "react";

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
export const FilterDropDown = ({
  isPaired,
  setIsPaired,
}: {
  isPaired: any;
  setIsPaired: any;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOutsideAlerter(dropdownRef, setDropdownOpen);

  const handleAlonePaired = ()=>{
    setIsPaired("false")
    setDropdownOpen(false)
  }
  const handlePairPaired = ()=>{
    setIsPaired("true")
    setDropdownOpen(true)
  }

  return (
    <div className="relative inline-block text-left z-50 " ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full  py-2  font-Sans font-medium text-primary  focus:outline-none capitalize ltr:border-r-2 ltr:pr-2 rtl:border-l-2  rtl:pl-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <ViewIcon className="w-5 h-5" />
          <span className="font-medium pl-1">Filter</span>
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
            <button
              onClick={handleAlonePaired}
              className="text-gray-700 w-full py-2 text-sm hover:bg-gray-100 cursor-pointer"
              role="menuitem"
            >
              Pair a lone
            </button>
            <button
              onClick={handlePairPaired}
              className="text-gray-700 w-full py-2 text-sm hover:bg-gray-100 cursor-pointer"
              role="menuitem"
            >
              Pair with a partner
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
