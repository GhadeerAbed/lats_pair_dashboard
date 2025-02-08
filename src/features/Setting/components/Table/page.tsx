
import React from "react";
import { useTable, useRowSelect, Column, Row, TableOptions } from "react-table";
import { Checkbox } from "../../../../components/page";
import { TableProps } from "../../../../types/page";

export const Table: React.FC<{
  columns: Column<TableProps>[];
  data: TableProps[];
  showCheckboxes?: boolean;
  totalEntries?: number;
  className?: string;
  onRowClick?: (row: TableProps) => void;
}> = ({
  columns,
  data,
  showCheckboxes = true,
  totalEntries = 0,
  className,
  onRowClick,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows, // Get selected rows
  } = useTable(
    {
      columns,
      data,
    } as TableOptions<TableProps>,
    useRowSelect,
    (hooks) => {
      if (showCheckboxes) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }: { row: Row<TableProps> }) => (
              <div>
                <Checkbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  return (
    <div className={`flex flex-col bg-white rounded-md font-Sans ${className}`}>
      {totalEntries === 0 ? (
        <div className="text-center bg-white text-[#1D1D1D] font-[500] text-[15px] py-5">
          No data found
        </div>
      ) : (
        <>
          <div className="z-0">
            <div className="overflow-x-auto">
              <table {...getTableProps()} style={{ width: "100%" }}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                      {headerGroup.headers.map((column, i) => (
                        <th
                          {...column.getHeaderProps()}
                          key={column.id}
                          className={`text-[#1D1D1D] font-[500] text-[15px] whitespace-nowrap ${
                            i < 2 ? `sticky left-0 z-1 sticky-column-${i} whitespace-nowrap` : ""
                          }`}
                        >
                          <span className="flex flex-row items-center justify-center">
                            {column.render("Header")}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell, i) => (
                          <td
                            {...cell.getCellProps()}
                            key={cell.column.id}
                            className={`${
                              i < 2 ? `sticky left-0 bg-white z-1 sticky-column-${i} whitespace-nowrap` : ""
                            } text-fontColor1 text-[15px] font-[500] cursor-pointer`}
                            onClick={
                              i < row.cells.length - 1 ? () => onRowClick?.(row.original) : undefined
                            }
                          >
                            <span className={`flex justify-center whitespace-nowrap ${cell.column.className || ""}`}>
                              {cell.render("Cell")}
                            </span>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Table;
