"use client";
import { URL_PATHS } from "../../../data/page";
import { usePathname, useRouter} from "next/navigation";

import { ExpendedSideList } from "../page";

import { FC } from "react";
import {
  Button,
  CategorySvg,
  CustomerSvg,
  DashSvg,
  OrderSvg,
  PackageSvg,
  PaymentSvg,
  SettingSvg,
} from "@/components/page";
import { LogIcon } from "@/lib/@heroicons/page";

interface ExpendedSideProps {}

export const ExpendedSide: FC<ExpendedSideProps> = ({}) => {
  const pathname = usePathname();
  const router= useRouter()

  const isActive = (path: string, subPaths: string[] = []): boolean => {
    return (
      pathname === path ||
      subPaths.some((subPath) => pathname.startsWith(subPath))
    );
  };
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    router.push('/');
  };

  return (
    <ul className="font-Sans  flex flex-col justify-center space-y-4 text-black px-2 whitespace-nowrap">
      <ExpendedSideList
        title="Dashboard"
        icon={<DashSvg />}
        href={`/dashboard`}
        isActive={isActive(`/dashboard`, [])}
      />

      <ExpendedSideList
        title={"Appointments"}
        icon={<CategorySvg />}
        href={`/dashboard/appointments`}
        isActive={isActive(`/dashboard/appointments`, [])}
      />

      <ExpendedSideList
        title={"Users"}
        icon={<PackageSvg />}
        href={`/dashboard/users`}
        isActive={isActive(`/dashboard/users`, [
          "/dashboard/users/addUsers",
          "/dashboard/users/addUsersPreferences",
        ])}
      />

      <ExpendedSideList
        title={"Blogs"}
        icon={<OrderSvg />}
        href={`/dashboard/blogs`}
        isActive={isActive(`/dashboard/blogs`, ["/dashboard/blogs/addBlogs"])}
      />

      <ExpendedSideList
        title={"Setting"}
        icon={<SettingSvg />}
        href={`/dashboard/setting`}
        isActive={isActive(`/dashboard/setting`, [])}
      />
      <button
        className="bg-white text-red-500 border-none text-lg pl-3 flex items-center gap-2 cursor-pointer "
        onClick={ 
          handleLogout
        }
      >
        <LogIcon className="w-6 h-6" />
        <span>Logout</span>
      </button>
    </ul>
  );
};

export default ExpendedSide;
