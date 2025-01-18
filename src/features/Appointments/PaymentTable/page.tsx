import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { TableProps } from "@/types/page";


export const PaymentTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  setCurrentPage: any;
  currentPage: number;
}> = ({
  leadResponseData,
  isLoadingLeads,
  setCurrentPage,
  currentPage,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [tableData, setTableData] = useState<TableProps[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const fixedColumns: Column<TableProps>[] = [
    { id: "Customer", Header: "Customer", accessor: "Customer" },
    { id: "PaymentDate", Header: "Payment Date", accessor: "PaymentDate" },
    { id: "Amount", Header: "Amount", accessor: "Amount" },
    { id: "PaymentMethod", Header: "Payment Method", accessor: "PaymentMethod" },
    { id: "OrderStatus", Header: "Order Status", accessor: "OrderStatus" },
  ];

  useEffect(() => {
    if (leadResponseData && leadResponseData.data && leadResponseData.data.paymentMethod) {
      console.log("Lead Response Data:", leadResponseData);
      if (leadResponseData.status === "success") {
        const { paymentMethod, pagination } = leadResponseData.data;

        const mappedData = paymentMethod.map((payment: any) => ({
          id: payment._id,
          Customer: payment.user?.firstName || "Unknown",  
          PaymentDate: formatDate(payment.createdAt), 
          Amount: payment.order?.amount || 0, 
          PaymentMethod: payment.type || "N/A", 
          OrderStatus: payment.order?.status || "N/A"
        }));

        console.log(mappedData);
        setTableData(mappedData);
        setTotalPages(pagination.totalPages);
        setTotalEntries(pagination.totalOrders);
      }
    }
  }, [leadResponseData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const areColumnsAndDataReady = fixedColumns.length > 0 && tableData.length > 0;

  return (
    <div>
      <div className="bg-lightSecondary rounded-[15px] mt-2 pt-4">
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

export default PaymentTable;

