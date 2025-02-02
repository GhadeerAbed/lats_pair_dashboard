"use client";
import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { TableProps } from "@/types/page";
import { Table } from "@/features/Setting/components/Table/page";
import { ActionDropdown1 } from "@/features/Appointments/components/page";

export const AppointmentTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  setCurrentPage: any;
  currentPage: number;
  mutate: any;
}> = ({
  leadResponseData,
  isLoadingLeads,
  setCurrentPage,
  currentPage,
  mutate,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [tableData, setTableData] = useState<TableProps[]>([]);

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
      Cell: ({ row }) => {
        return (
          <ActionDropdown1
            userId={row.original.userId}
            id={row.original.ID}
            mutate={mutate}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (leadResponseData) {
      // Map the response to the desired table format
      const mappedData = leadResponseData.map((product: any) => ({
        userId: product.id,
        ID: product.userId,
        Name: product.user.name,
        startTime: product.startTime,
        endTime: product.endTime,
        paymentStatus: product.paymentStatus,
        isPaired: product.isPaired, // Keep it as a boolean for conditional rendering
        action: "action",
      }));

      setTableData(mappedData);

      const totalItems = leadResponseData.length;
      setTotalPages(Math.ceil(totalItems / 1));
      setTotalEntries(totalItems);
    }
  }, [leadResponseData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const areColumnsAndDataReady =
    fixedColumns.length > 0 && tableData.length > 0;

  return (
    <div>
      <div className="rounded-[15px] mt-2">
        {isLoadingLeads ? (
          <div className="flex justify-center items-center py-3">
            <p>Data is Loading...</p>
          </div>
        ) : areColumnsAndDataReady ? (
          <Table
            columns={fixedColumns}
            data={tableData}
            showCheckboxes={true}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalEntries={totalEntries}
          />
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
