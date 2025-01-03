import React from "react";
import TableList from "./page";
import { useTranslations } from "next-intl";

export const PaymentParent = () => {
  const t = useTranslations();
  return (
    <div>
      <div className="bg-white max-w-[800px] p-3 rounded-md flex justify-between items-center my-8">
        <p className="font-semibold  text-lg">{t("sidebar.payment")}</p>
      </div>
      <TableList/>
    </div>
  );

}
export default PaymentParent;
