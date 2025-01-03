// components/MonthlyViewsChart.tsx

"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSWRHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const monthsOrder = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

export const MonthlyViewsChart = () => {
  const { data, error } = useSWRHook(API_SERVICES_URLS.GET_VISES);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (data && data.status === "success") {
      // Arrange monthly data according to the Arabic month order
      const sortedData = monthsOrder.map((month) => {
        const item = data.data.find((d: any) => d.month === month);
        return item ? item.monthlyViewCount : 0;
      });

      // Prepare chart data
      setChartData({
        labels: monthsOrder,
        datasets: [
          {
            label: "عدد الزوار شهرياً",
            data: sortedData,
            backgroundColor: "#1E3A8A", // Tailwind blue-900 color
            borderColor: "#1E3A8A",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [data]);

  if (error) return <p>Error loading data...</p>;
  if (!data) return <div className="bg-white  text-center w-[600px] py-5 mt-20">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-right text-gray-800 mb-4">عدد الزوار شهرياً</h2>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 20,
                  callback: (value) => `${value}`, // Display values as-is
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default MonthlyViewsChart;
