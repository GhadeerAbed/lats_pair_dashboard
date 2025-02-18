"use client";

import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { TableProps } from "@/types/page";
import { Table } from "@/features/Setting/components/Table/page";
import { ActionDropdown1 } from "@/features/Appointments/components/page";

export const AppointmentTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  mutate: any;
}> = ({ leadResponseData, isLoadingLeads, mutate }) => {
  const [totalEntries, setTotalEntries] = useState(0);
  const [tableData, setTableData] = useState<TableProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(9); // Initially show 10 rows

  const fixedColumns: Column<TableProps>[] = [
    { id: "ID", Header: "ID", accessor: "ID" },
    { id: "Name", Header: "Name", accessor: "Name" },
    { id: "startTime", Header: "Start Time", accessor: "startTime" },
    { id: "endTime", Header: "End Time", accessor: "endTime" },
    {
      id: "paymentStatus",
      Header: "Payment Status",
      accessor: "paymentStatus",
      Cell: ({ value }) => (
        <span className={value === "PAID" ? "text-green-500" : "text-red-500"}>
          {value}
        </span>
      ),
    },
    {
      id: "isPaired",
      Header: "Is Paired",
      accessor: "isPaired",
      Cell: ({ value }) => (
        <span className={value ? "text-green-500" : "text-red-500"}>
          {value ? "True" : "False"}
        </span>
      ),
    },
    {
      id: "action",
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <ActionDropdown1 userId={row.original.userId} id={row.original.ID} mutate={mutate} />
      ),
    },
  ];

  useEffect(() => {
    if (leadResponseData) {
      const mappedData = leadResponseData.map((product: any) => ({
        userId: product.id,
        ID: product.userId,
        Name: product.user.name,
        startTime: product.startTime,
        endTime: product.endTime,
        paymentStatus: product.paymentStatus,
        isPaired: product.isPaired,
        action: "action",
      }));

      setTableData(mappedData);
      setTotalEntries(mappedData.length);
    }
  }, [leadResponseData]);

  const areColumnsAndDataReady = fixedColumns.length > 0 && tableData.length > 0;

  return (
    <div>
      <div className="rounded-[15px] mt-2">
        {isLoadingLeads ? (
          <div className="flex justify-center items-center py-3">
            <p>Data is Loading...</p>
          </div>
        ) : areColumnsAndDataReady ? (
          <>
            <Table columns={fixedColumns} data={tableData.slice(0, visibleCount)} showCheckboxes={true} totalEntries={totalEntries} />
            {visibleCount < tableData.length && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setVisibleCount(tableData.length)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  See More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center py-3">
            <p>No data available to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentTable;
