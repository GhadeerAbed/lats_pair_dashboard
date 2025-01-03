"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/page";
import screens1 from "../../../public/screens1.svg";
import { getAuthData } from "@/utils/page";
import CompanyDropdown from "../components/CompanyDropdown/page";

export const Navbar = () => {
  const authUser = getAuthData();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between px-20 border-b-2 py-3 shadow-NavShadow">
        <div>
          <Image src={screens1} alt="logo" />
        </div>

        <div className="flex items-center gap-4 text-black cursor-pointer rtl:ml-5">
          {!authUser ? (
            <Button
              className="bg-primary text-white px-6"
              onClick={() => router.push(`/login`)}
            >
              login
            </Button>
          ) : (
            <CompanyDropdown />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
