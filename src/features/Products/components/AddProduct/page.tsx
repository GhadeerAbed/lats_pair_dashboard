"use client";
import { Button, Input, Select } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { DeleteIcon } from "@/lib/@heroicons/page";
import React, { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { FileUpload } from "../page";
import TagsInput from "../TagsInput/page";
import { toast } from "sonner";

export const AddProduct = ({setProductId ,setStepData ,onNext , productId} : {setProductId : any , setStepData : any , onNext : any ; productId : any}) => {
  const { control, register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      specification: [{ ar: "", en: "" }], 
    },
  });
  
  const [images, setImages] = useState([]);

  const handleFilesChange = (newFiles: any) => {
    setImages((prevImages:any) => [...prevImages, ...newFiles]);
    setValue("images", [...images, ...newFiles]);
  };

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "specification",
  });

  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_PRODUCT,
    "POST"
  );



  const { data } = useSWRHook(API_SERVICES_URLS.GET_MAIN_CATEGORY);
  const selectedMainCategoryId = useWatch({
    control,
    name: "mainCategoryId",
  });

  const options = 
  data &&  Array.isArray(data.data)
    ? data.data.map((category: any) => ({
        name: category.name,
        value: category._id,
      }))
    : [];
  const { data: subCategories } = useSWRHook(
    selectedMainCategoryId &&
      API_SERVICES_URLS.GET_SUB_CATEGORIES(selectedMainCategoryId)
  );
  const subCategoryOptions = subCategories
    ? subCategories.data.map((subcategory: any) => ({
        name: subcategory.name,
        value: subcategory._id,
      }))
    : [];

  const { data: brands } = useSWRHook(API_SERVICES_URLS.GET_BRANDS);
  const brandsOptions = brands
  ? brands?.data.map((brand:any) => ({name: brand.name, value: brand._id }))
  : [];
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("type", "draft");
    formData.append("name[en]", data.name.en);
    formData.append("name[ar]", data.name.ar);
    formData.append("description[en]", data.description.en);
    formData.append("description[ar]", data.description.ar);
    formData.append("productFeature[en]", data.productFeature.en);
    formData.append("productFeature[ar]", data.productFeature.ar);
    formData.append("price", data.price);
    formData.append("sku", data.sku);
    formData.append("availableStock", data.availableStock);
    formData.append("mainCategoryId", data.mainCategoryId);
    formData.append("subCategoryId", data.subCategoryId);
    formData.append("brandId", data.brandId);
    formData.append("additionalInformation[ar]", data.additionalInformation.ar);
    formData.append("additionalInformation[en]", data.additionalInformation.en);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    if (Array.isArray(data.specification)) {
      data.specification.forEach((attr: any, index: number) => {
        if (attr.en && attr.ar) { // Only append if both are present
          formData.append(`specification[${index}][en]`, attr.en);
          formData.append(`specification[${index}][ar]`, attr.ar);
        } else {
          console.error(`Specification at index ${index} is incomplete:`, attr);
        }
      });
    }
    
    data.tags.forEach((tag: any, index: number) => {
      formData.append(`tags[${index}]`, tag);
    });
  
    setStepData(data);
    try {
      const response = await customTrigger(formData);
      if (response?.status === "success" && response?.code === 200) {
        setProductId(response.data._id)
        toast.success("product add successfully")
        onNext()
      } else {
        toast.error("Failed to add product")
      }
    } catch (error) {
      toast.error("Failed to add product")
    }
  };

  return (
    <div className="bg-white p-6 rounded-md ">
      <h1 className="font-semibold  text-lg ">{t("add_product")}</h1>
      <p className="py-4  text-sm">{t("product_form")}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
        <div className="grid sm:grid-cols-2 grid-cols-1  gap-4 ">
          <Input
            type="text"
            label="إسم المنتج بالعربي*"
            id="name[ar]"
            className="mb-5"
            {...register("name[ar]", { required: true })}
          />
          <Input
            type="text"
            label="إسم المنتج بالإنجليزي *"
            id="name[en]"
            className="mb-5"
            {...register("name[en]", { required: true })}
          />
          <Input
            type="text"
            label="وصف المنتج بالعربي *"
            id="description[ar]"
            className="mb-5"
            {...register("description[ar]", { required: true })}
          />
          <Input
            type="text"
            label="وصف المنتج بالإنجليزي*"
            id="description[en]"
            className="mb-5"
            {...register("description[en]", { required: true })}
          />
        </div>
        <div>
          {attributeFields.map((field, index) => (
            <div key={field.id} className="flex gap-1">
              <div className="flex-1">
                <Input
                  type="text"
                  label="الخصائص عربي"
                  id={`attribute-english-${index}`}
                  className="mb-5 "
                  {...register(`specification.${index}.ar`, {
                    required: true,
                  })}
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  label="الخصائص إنجليزي"
                  id={`attribute-arabic-${index}`}
                  className="mb-5 mr-3"
                  {...register(`specification.${index}.en`, {
                    required: true,
                  })}
                />
              </div>
              <div className=" flex gap-3  ">
                <button type="button" onClick={() => removeAttribute(index)}>
                  <DeleteIcon className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => appendAttribute({ ar: "", en: "" })}
                  className=" text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <input type="hidden" {...register("images")} />
        <FileUpload
          label="صور المنتج (يمكنك رفع صور متعددة) *"
          id="productImages"
          onFilesChange={handleFilesChange}
        />
        <div className="grid sm:grid-cols-2 grid-cols-1  gap-4 ">
          <Input
            type="text"
            label="مميزات المنتج بالعربي*"
            id="productFeature[ar]"
            className="mb-5"
            {...register("productFeature[ar]", { required: true })}
          />
          <Input
            type="text"
            label="مميزات المنتج بالإنجليزي *"
            id="productFeature[en]"
            className="mb-5"
            {...register("productFeature[en]", { required: true })}
          />
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1  gap-4 ">
          <Input
            type="text"
            label=" معلومات اضافية بالعربي*"
            id="additionalInformation[ar]"
            className="mb-5"
            {...register("additionalInformation[ar]", { required: true })}
          />
          <Input
            type="text"
            label="معلومات اضافية بالإنجليزي *"
            id="additionalInformation[en]"
            className="mb-5"
            {...register("additionalInformation[en]", { required: true })}
          />
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1  gap-4 ">
          <Input
            type="text"
            label="سعر المنتج *"
            id={"price"}
            className="mb-5"
            {...register(`price`, {
              required: true,
            })}
          />
          <Input
            type="text"
            label="الكمية المتوفرة *"
            id={"availableStock"}
            className="mb-5"
            {...register(`availableStock`, {
              required: true,
            })}
          />
        </div>
        <Input
          type="text"
          label="SKU"
          id={`sku`}
          className="mb-5"
          {...register(`sku`, {
            required: true,
          })}
        />
        <Select
          label="القسم الرئيسي *"
          id="mainCategory"
          options={options}
          placeholder="main category.."
          selectClassName="pl-4 !py-3 !mb-4"
          {...register("mainCategoryId")}
        /> 
        <Select
          label="القسم الفرعي *"
          id="subCategory"
          placeholder="sub category.."
          options={subCategoryOptions}
          selectClassName="pl-4 !py-3 !mb-4"
          {...register("subCategoryId")}
          disabled={!selectedMainCategoryId}
        />
       <Select
          label="الماركة *"
          id="brand"
          options={brandsOptions}
          selectClassName="pl-4 !py-3 !mb-4"
          {...register("brandId")}
        />  

        <TagsInput register={register} setValue={setValue} initialValue={[]} />

        <div className="flex gap-3">
          <Button
            className="bg-primary text-white uppercase w-full mt-8"
            type="submit"
            buttonLoadingProps={{ loadingText: "Submitting..." }}
            loading={isMutating}
          >
            {t("add")}
          </Button>
          <Button
            className="bg-white text-primary border-primary uppercase w-full mt-8"
            type="button"
            onClick={ productId && (() => onNext())}
          >
            {"next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
