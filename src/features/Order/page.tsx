import React from "react";
import TableList from "./TableList";
import { useTranslations } from "next-intl";

const Order = () => {
  const t = useTranslations();
  return (
    <div className="lg:w-[1000px] w-[600px]">
      <div className="bg-white rounded-md  p-3 ">
        <p className="font-semibold  text-lg">{t("sidebar.orders")} </p>
      </div>
      <TableList />
    </div>
  );
};

export default Order;
