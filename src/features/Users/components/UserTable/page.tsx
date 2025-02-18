"use client"
import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { TableProps } from "@/types/page";
import { Table } from "@/features/Setting/components/Table/page";
import ActionDropdown from "../ActionDropdown/page";

export const UserTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  mutate: any;
}> = ({ leadResponseData, isLoadingLeads, mutate }) => {
  const [totalEntries, setTotalEntries] = useState(0);
  const [tableData, setTableData] = useState<TableProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(9); // Initially show only 10 users

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
      Cell: ({ row }) => (
        <ActionDropdown id={row.original.ID} mutate={mutate} />
      ),
    },
  ];

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
      setTotalEntries(mappedData.length);
    }
  }, [leadResponseData]);

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
          <>
            <Table
              columns={fixedColumns}
              data={tableData.slice(0, visibleCount)} // Show only first "visibleCount" items
              showCheckboxes={true}
              totalEntries={totalEntries}
            />
            {visibleCount < tableData.length && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setVisibleCount(tableData.length)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  See All
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

export default UserTable;
