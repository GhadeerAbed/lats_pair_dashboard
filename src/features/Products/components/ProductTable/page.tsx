import React, { useEffect, useState } from "react";
import { Column } from "react-table";
import { TableProps } from "@/types/page";
import { DeleteIcon, EditIcon } from "@/lib/@heroicons/page";
import { Table } from "@/features/Order/components/page";
import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { BigModal, ConfirmModal } from "@/components/page";
import { useTranslations } from "next-intl";

export const ProductTable: React.FC<{
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
  const t = useTranslations();

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
    { id: "Name", Header: "إسم المنتج", accessor: "Name" },
    { id: "SKU", Header: "SKU", accessor: "SKU" },
    { id: "mainCategory", Header: "القسم الرئيسي", accessor: "mainCategory" },
    { id: "subCategory", Header: "القسم الفرعي", accessor: "subCategory" },
    { id: "Price", Header: "السعر", accessor: "Price" },
    {
      id: "Image",
      Header: "Image",
      accessor: "Image",
      Cell: ({ value }) => (
        <img
          src={value}
          alt="Category"
          className="w-6 h-6 rounded-full"
          width={15}
          height={15}
        />
      ),
    },
    { id: "Quantity", Header: "الكمية", accessor: "Quantity" },
    { id: "brandName", Header: "الماركة", accessor: "brandName" },
    { id: "tagsNames", Header: "الفئة", accessor: "tagsNames" },
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
    if (leadResponseData && leadResponseData.status === "success") {
      const { data } = leadResponseData;

      const mappedData = data.products.map((product: any) => ({
        id: product._id,
        Name: product.name,
        SKU: product.sku,
        mainCategory: product.mainCategoryName,
        subCategory: product.subCategoryName,
        Price: product.price,
        Image: product.images[0],
        Quantity: product.availableStock,
        brandName: product.brandName[0],
        tagsNames: product.tagsNames[0],
        action: "action",
      }));

      setTableData(mappedData);
      setTotalPages(data.pagination.totalPages);
      setTotalEntries(data.pagination.totalProducts);
    }
  }, [leadResponseData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const areColumnsAndDataReady =
    fixedColumns.length > 0 && tableData.length > 0;

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

      {/* Confirmation Modal */}
      <BigModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <ConfirmModal
          title={t("title")}
          message={t("message")}
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

export default ProductTable;
