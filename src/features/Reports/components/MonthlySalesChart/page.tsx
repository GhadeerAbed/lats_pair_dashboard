"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSWRHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const monthsOrder = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

export const MonthlySalesChart = () => {
  const { data, error } = useSWRHook(API_SERVICES_URLS.GET_PAYMENT);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (data && data.status === "success") {
      const sortedData = monthsOrder.map((month) => {
        const item = data.data.find((d: any) => d.month === month);
        return item ? item.monthlySalesCount : 0;
      });

      // Prepare chart data
      setChartData({
        labels: monthsOrder,
        datasets: [
          {
            label: "المبيعات الشهرية",
            data: sortedData,
            borderColor: "#4F46E5", // Tailwind Indigo-600 color
            backgroundColor: "rgba(79, 70, 229, 0.2)",
            tension: 0.4,
            pointBackgroundColor: "#4F46E5",
            pointBorderColor: "#4F46E5",
          },
        ],
      });
    }
  }, [data]);

  if (error) return <div >Error loading data...</div>;
  if (!data) return <div className="bg-white  text-center w-[600px] py-5">Loading...</div>;

  return (
    <div className="p-3 bg-white rounded-lg shadow-lg w-full">
      <h2 className="text-lg font-semibold text-right text-gray-800 mb-4">المبيعات الشهرية</h2>
      {chartData && (
        <Line
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
                  callback: (value) => `${value} ر.س`, // Adding currency label in Arabic
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default MonthlySalesChart;
