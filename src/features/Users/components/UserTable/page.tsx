"use client";
import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { TableProps } from "@/types/page";
import { Table } from "@/features/Setting/components/Table/page";
import ActionDropdown from "../ActionDropdown/page";

export const UserTable: React.FC<{
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
    { id: "Email", Header: "Email", accessor: "Email" },
    { id: "DateOfBirth", Header: "Date of birth", accessor: "DateOfBirth" },
    { id: "Role", Header: "Role", accessor: "Role" },
    {
      id: "action",
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        return (
          <ActionDropdown
            id={row.original.ID} // Pass the id here
            mutate={mutate} // Pass any other props
          />
        );
      },
    },
  ];
console.log(leadResponseData?.length)
  useEffect(() => {
    if (leadResponseData) {
     
      const mappedData = leadResponseData.map((product: any) => ({
        ID: product.id,
        Name: product.name,
        Email: product.email,
        DateOfBirth: product.birthDay || "N/A",
        Role: product.role || "N/A",
        action: "action",
      }));

      setTableData(mappedData);

      const totalItems = leadResponseData.length;
      setTotalPages(Math.max(1, Math.ceil(totalItems / 5)));

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
      <div className=" rounded-[15px] mt-2 ">
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

export default UserTable;
