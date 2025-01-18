"use client";
import { URL_PATHS } from "../../../data/page";
import { usePathname } from "next/navigation";

import { ExpendedSideList } from "../page";

import { FC } from "react";
import {
  CategorySvg,
  CustomerSvg,
  DashSvg,
  OrderSvg,
  PackageSvg,
  PaymentSvg,
  SettingSvg,
} from "@/components/page";

interface ExpendedSideProps {}

export const ExpendedSide: FC<ExpendedSideProps> = ({}) => {
  const pathname = usePathname();

  const isActive = (path: string, subPaths: string[] = []): boolean => {
    return (
      pathname === path ||
      subPaths.some((subPath) => pathname.startsWith(subPath))
    );
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
          '/dashboard/users/addUsers',
          '/dashboard/users/addUsersPreferences',
        ])}
       />

      <ExpendedSideList
        title={"Blogs"}
        icon={<OrderSvg />}
        href={`/dashboard/blogs`}
        isActive={isActive(`/dashboard/blogs`, ['/dashboard/blogs/addBlogs'])}
      />
      
      <ExpendedSideList
        title={"Setting"}
        icon={<SettingSvg />}
        href={`/dashboard/setting`}
        isActive={isActive(`/dashboard/setting`, [])}
      />
    </ul>
  );
};

export default ExpendedSide;
