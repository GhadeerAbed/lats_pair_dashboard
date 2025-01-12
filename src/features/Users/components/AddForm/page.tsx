"use client";
import React, { useState, Suspense } from "react";
import { toast } from "sonner";
import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import AddCombination from "../UserPreferencesForm/page"; // Adjust the path as needed
import { AddProduct } from "../page";

const AddForm = () => {
  const [productId, setProductId] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});

  const { customTrigger, isMutating: updatingProduct } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_PRODUCT(productId),
    "PUT"
  );

  const handleNextStep = () => setActiveStep((prev) => prev + 1);
  const handlePrevStep = () => setActiveStep((prev) => prev - 1);

  const validateData = (data:any) => {
    if (!data.name || !data.price) {
      toast.error("Name and price are required");
      return false;
    }
    if (data.images?.length === 0) {
      toast.error("At least one image is required");
      return false;
    }
    return true;
  };


  const handleSubmitAllData = async () => {
    const combinedData = { ...step1Data, ...step2Data };

    if (!validateData(combinedData)) return;

    const formData = new FormData();
    Object.entries(combinedData).forEach(([key, value]) => {
      if (key !== "images" && key !== "colorImages") {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            formData.append(`${key}[${nestedKey}]`, nestedValue);
          });
        } else {
          formData.append(key, value);
        }
      }
    });

    combinedData.specification?.forEach(
      (attr:any, index:number) => {
        formData.append(`specification[${index}][en]`, attr.en);
        formData.append(`specification[${index}][ar]`, attr.ar);
      }
    );

    if (Array.isArray(combinedData.images)) {
      combinedData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    if (Array.isArray(combinedData.colorImages)) {
      combinedData.colorImages.forEach((image) => {
        formData.append("colorImages", image);
      });
    }

    try {
      const response = await customTrigger(formData);
      if (response?.status === "success") {
        toast.success("Product updated successfully");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {activeStep === 0 && (
          <AddProduct
            setProductId={setProductId}
            onNext={handleNextStep}
            setStepData={setStep1Data}
            productId={productId}
          />
        )}
        {activeStep === 1 && (
          <AddCombination
            productId={productId}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            setStepData={setStep2Data}
            onSubmitAll={handleSubmitAllData}
            updatingProduct={updatingProduct}
          />
        )}
      </Suspense>
    </div>
  );
};

export default AddForm;
