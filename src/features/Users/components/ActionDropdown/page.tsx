"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { toast } from "sonner";
import { DeleteIcon, EditIcon, EyeIcon } from "@/lib/@heroicons/page";
import { useRouter } from "next/navigation";

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

export const ActionDropdown = ({
  id,
  mutate,
}: {
  id: any;
  mutate: () => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideAlerter(dropdownRef, setDropdownOpen);
  const router = useRouter();
  console.log(id)
  const { customTrigger: deleteUser } = useSWRMutationHook(
    API_SERVICES_URLS.DELATE_USER(id),
    "DELETE"
  );

  const { customTrigger } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_USER(id),
    "PATCH"
  );

  const handleShowDetails = () => {
    setDropdownOpen(false);
    router.push(`/dashboard/users/${id}`); // Navigate to the details page
  };

  const handleUserDelete = async () => {
    try {
      const res = await deleteUser({ isDeleted: true });
      mutate();
      if (res.isSuccessed) {
        toast.success("User Deleted successfully!");
      } else {
        toast.error("Failed to Delete User.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting user.");
      console.error("Error:", error);
    } finally {
      setDropdownOpen(false);
    }
  };
  console.log(id)

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="relative inline-flex justify-center w-full  py-2 bg-white font-nunito font-medium text-gray-700  focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ...
        </button>
      </div>

      {dropdownOpen && (
        <div
          className="origin-top-right absolute font-nunito -ml-12 w-[140px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          style={{ position: "fixed", zIndex: "1000" }}
        >
          <div className="py-1" role="none">
            <button
              onClick={handleShowDetails}
              className="text-secondary flex gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              <EyeIcon className="w-5 h-5 text-primary" />
              Show Details
            </button>

            <button
              className=" flex text-secondary  w-full gap-2 text-left px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              <EditIcon className="w-5 h-5 text-primary" />
              Edit
            </button>

            <button
              onClick={() => handleUserDelete()}
              className="text-secondary flex gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
            >
              <DeleteIcon className="w-5 h-5 text-primary" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
