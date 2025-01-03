"use client";

import { MonthlySalesChart, MonthlyViewsChart } from "./components/page";

export const Reports = () => {
  return (
    <div className=" flex flex-col items-center justify-center gap-5 w-[700px] ">
      <MonthlySalesChart />
      <MonthlyViewsChart/>
    </div>
  );
};
export default Reports;
