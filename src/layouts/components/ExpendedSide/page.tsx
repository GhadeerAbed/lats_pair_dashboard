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
        title="products"
        icon={<DashSvg />}
        href={`/${URL_PATHS.DASHBOARD.PAGE}`}
        isActive={isActive(`/${URL_PATHS.DASHBOARD.PAGE}`, [])}
      />

      <ExpendedSideList
        title={"offers"}
        icon={<CategorySvg />}
        href={`/${URL_PATHS.DASHBOARD.OFFERS}`}
        isActive={isActive(`/${URL_PATHS.DASHBOARD.OFFERS}`, [])}
      />

      <ExpendedSideList
        title={"reports"}
        icon={<PackageSvg />}
        href={`/${URL_PATHS.DASHBOARD.REPORTS}`}
        isActive={isActive(`/${URL_PATHS.DASHBOARD.REPORTS}`, [])}
      />

      <ExpendedSideList
        title={"sidebar.orders"}
        icon={<OrderSvg />}
        href={`/${URL_PATHS.DASHBOARD.ORDER}`}
        isActive={isActive(`/${URL_PATHS.DASHBOARD.ORDER}`, [])}
      />
    </ul>
  );
};

export default ExpendedSide;
