import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { TableProps } from "@/types/page";
import { Table } from "../page";

export const OrderTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  setCurrentPage: any;
  currentPage: number;
}> = ({ leadResponseData, isLoadingLeads, setCurrentPage, currentPage }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [tableData, setTableData] = useState<TableProps[]>([]);

  const fixedColumns: Column<TableProps>[] = [
    { id: "OrderNumber", Header: "رقم الطلب", accessor: "OrderNumber" },
    { id: "Customer", Header: "اسم العميل", accessor: "Customer" },
    { id: "Products", Header: "المنتجات", accessor: "Products" },
    { id: "OrderDate", Header: "تاريخ الطلب", accessor: "OrderDate" },
    { id: "Amount", Header: "المبلغ", accessor: "Amount" },
    { id: "PaymentMethod", Header: "طريقة الدفع", accessor: "PaymentMethod" },
    { id: "OrderStatus", Header: "حالة الشحن", accessor: "OrderStatus" },
    { id: "OrderAddress", Header: "عنوان الشحن", accessor: "OrderAddress" },
  ];

  useEffect(() => {
    if (leadResponseData && leadResponseData.status === "success") {
      const { orders, pagination } = leadResponseData.data;

      // Map orders data to match the table structure
      const mappedData = orders.map((order: any) => ({
        id: order._id,
        OrderNumber: order.orderNumber,
        Customer: order.user || "Unknown",
        Products: order.items
          .map((item: any) => `${item.product} (x${item.quantity})`)
          .join(", "),
        OrderDate: new Date(order.createdAt).toLocaleDateString(),
        Amount: order.total || 0,
        PaymentMethod: order.paymentMethod || "N/A",
        OrderStatus: order.statusShipment || "N/A",
        OrderAddress: order.address,
      }));

      setTableData(mappedData);
      setTotalPages(pagination.totalPages || 1);
      setTotalEntries(pagination.totalOrders || 0);
    }
  }, [leadResponseData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const areColumnsAndDataReady = fixedColumns.length > 0 && tableData.length > 0;

  return (
    <div className="bg-white rounded-lg pb-8 ">
      <div className="rounded-[15px]">
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
