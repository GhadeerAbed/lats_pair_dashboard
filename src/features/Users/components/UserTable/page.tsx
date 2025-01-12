"use client"
import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { TableProps } from "@/types/page";
import { DeleteIcon, EditIcon } from "@/lib/@heroicons/page";
import { Table } from "@/features/Order/components/page";
import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { BigModal, ConfirmModal } from "@/components/page";


export const UserTable: React.FC<{
  leadResponseData: any;
  isLoadingLeads: boolean;
  setCurrentPage: any;
  currentPage: number;
}> = ({ leadResponseData, isLoadingLeads, setCurrentPage, currentPage }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [tableData, setTableData] = useState<TableProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<TableProps | null>(null);


  // Update and delete hooks
  const { customTrigger: deleteTrigger } = useSWRMutationHook(
    productToDelete ? API_SERVICES_URLS.DELATE_PRODUCT(productToDelete) : null,
    "DELETE"
  );
  const { customTrigger: updateTrigger } = useSWRMutationHook(
    productToEdit ? API_SERVICES_URLS.EDIT_PRODUCT(productToDelete.id) : null,
    "PATCH"
  );

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
        const handleDeleteClick = () => {
          setProductToDelete(row.original.id);
          setIsModalOpen(true);
        };

        const handleEditClick = () => {
          setProductToEdit(row.original);
          setIsEditModalOpen(true);
        };

        return (
          <div className="flex gap-2">
            <button
              onClick={handleDeleteClick}
              className="hover:text-blue-700 w-6 h-6"
            >
              <DeleteIcon />
            </button>
            <button
              onClick={handleEditClick}
              className="hover:text-red-700 w-6 h-6"
            >
              <EditIcon />
            </button>
          </div>
        );
      },
    },
  ];

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteTrigger();
      setTableData((prevData) =>
        prevData.filter((category) => category.id !== productToDelete)
      );
      setProductToDelete(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleEditSave = async (updatedCategory: { id: any }) => {
    if (!productToEdit) return;

    try {
      await updateTrigger(updatedCategory);
      setTableData((prevData: any) =>
        prevData.map((category: any) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
      console.log(
        `Category with ID ${updatedCategory.id} updated successfully`
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  useEffect(() => {
    if (leadResponseData) {
      console.log("Lead Response Data:", leadResponseData); // Debugging
  
      // Map the response to the desired table format
      const mappedData = leadResponseData.map((product: any) => ({
        ID: product.id,
        Name: product.name,
        Email: product.email,
        DateOfBirth: product.birthDay || "N/A",
        Role: product.role || "N/A",
        action: "action",
      }));
  
      // Set the mapped data to tableData
      setTableData(mappedData);
  
      // Set pagination information
      const totalItems = leadResponseData.length; // Assuming total items equal the length of the response
      setTotalPages(Math.ceil(totalItems / 10));
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

      {/* Confirmation Modal */}
      <BigModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <ConfirmModal
          title={("title")}
          message={("message")}
          onConfirm={confirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      </BigModal>

      {/* Edit Modal */}
      {/* <BigModal isOpen={isEditModalOpen} closeModal={() => setIsEditModalOpen(false)}>
        {productToEdit && (
          // <EditCategory
          //   category={productToEdit}
          //   onClose={() => setIsEditModalOpen(false)}
          //   onSave={handleEditSave}
          // />
        )}
      </BigModal> */}
    </div>
  );
};

export default UserTable;

