import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { TableProps } from "@/types/page";
import { DeleteIcon, EditIcon } from "@/lib/@heroicons/page";
import { Table } from "@/features/Order/components/page";
import EditCustomerProfile from "../EditCustomerProfile/page";
import { BigModal, ConfirmModal } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";


export const OfferTable: React.FC<{
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerIdToDelete, setCustomerIdToDelete] = useState<string | null>(null);


  // Define the table columns
  const fixedColumns: Column<TableProps>[] = [
    { id: "Name", Header: "إسم العرض", accessor: "Name" },
    { id: "Product", Header: "المنتج", accessor: "Product" },
    // { id: "Image", Header: "الصور", accessor: "Image" },
    { id: "TypeOffer", Header: "نوع العرض", accessor: "TypeOffer" },
    { id: "Code", Header: "رمز الخصم", accessor: "Code" },
    { id: "Value", Header: "قيمة الخصم", accessor: "Value" },
    { id: "CreatedAt", Header: "بدء العرض", accessor: "CreatedAt" },
    { id: "EndAt", Header: "إنتهاء العرض", accessor: "EndAt" },
    {
      id: "action",
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="hover:text-blue-700 w-6 h-6"
            onClick={() => {
              setCustomerIdToDelete(row.original.id);
              setIsDeleteModalOpen(true);
            }}
          >
            <DeleteIcon />
          </button>
          <button
            className="hover:text-red-700 w-6 h-6"
            onClick={() => handleEditClick(row.original)}
          >
            <EditIcon />
          </button>
        </div>
      ),
    },
  ];

  const handleEditClick = (customer: any) => {
    setSelectedCustomer(customer); 
    setIsEditModalOpen(true); 
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCustomerIdToDelete(null);
  };

  const { customTrigger: deleteTrigger } = useSWRMutationHook(
    API_SERVICES_URLS.DELETE_OFFER(customerIdToDelete),
    "DELETE"
  );

  const confirmDelete = async () => {
    if (customerIdToDelete) {
      await deleteTrigger(); 
      closeDeleteModal();
    }
  };

  useEffect(() => {
    if (leadResponseData && leadResponseData.data) {
      if (leadResponseData.status === "success") {
        const { data } = leadResponseData;

        // Map the users data to match table structure
        const mappedData = data?.transformedOffers.map((user: any) => ({
          id: user._id,
          Name: user.name,
          Product: user.product.name,
          TypeOffer: user.typeOffer,
          Code: user.discountCode,
          Value: user.discountValue,
          CreatedAt: new Date(user.startOfferDate).toLocaleDateString(),
          EndAt: new Date(user.endOfferDate).toLocaleDateString(),
          action: "action",
        }));

        setTableData(mappedData);
        setTotalPages(data.pagination.totalPages);
        setTotalEntries(data.pagination.totalProducts);
      }
    }
  }, [leadResponseData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const areColumnsAndDataReady = fixedColumns.length > 0 && tableData.length > 0;

  return (
    <div className="bg-white rounded-lg pt-2 pb-8">
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

      <BigModal isOpen={isEditModalOpen} closeModal={closeEditModal}>
        <EditCustomerProfile
          id={selectedCustomer?.id}
          category={selectedCustomer}
          onClose={closeEditModal}
        />
      </BigModal>

      <BigModal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal}>
      <ConfirmModal
          title={("title")}
          message={("message1")}
          onConfirm={confirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      </BigModal>
    </div>
  );
};

export default OfferTable;
