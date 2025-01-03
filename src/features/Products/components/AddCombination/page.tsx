"use client";
import { Button, Input } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import { DeleteIcon } from "@/lib/@heroicons/page";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Switch } from "@headlessui/react";
import { FileUpload } from "../page";

export const AddCombination = ({
  productId,
  setStepData,
  onNext,
  onPrev,
  onSubmitAll,
  updatingProduct
}: {
  setStepData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  productId: string;
  onSubmitAll: () => void;
  updatingProduct: boolean
}) => {
  const { control, register, handleSubmit ,setValue} = useForm({
    defaultValues: {
      sizes: [{ enabled: false, sizeName: "", quantity: 0 }],
      styles: [{ enabled: false, styleName: "" }],
      colors: [{ enabled: false, colorName: "", colorDegree: "" }],
    },
  });

  const [liveData, setLiveData] = useState({
    sizes: [{ enabled: false, name: "", quantity: 0 }],
    styles: [{ enabled: false, name: "" }],
    colors: [{ enabled: false, name: "", degree: "" }],
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control, name: "sizes" });
  const {
    fields: styleFields,
    append: appendStyle,
    remove: removeStyle,
  } = useFieldArray({ control, name: "styles" });
  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({ control, name: "colors" });

  const { customTrigger: createCombination, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_COMBINATION(productId),
    "POST"
  );
  const [enabled, setEnabled] = useState(false);
  const [enabled1, setEnabled1] = useState(false);
  const [enabled2, setEnabled2] = useState(false);

  const handleLiveDataChange = (
    fieldName: string,
    value: string,
    index: number
  ) => {
    setLiveData((prevData) => {
      const updatedData = { ...prevData };
      const [category, property] = fieldName.split(".");
      if (!updatedData[category]) {
        updatedData[category] = [];
      }
      if (!updatedData[category][index]) {
        updatedData[category][index] = {};
      }
      updatedData[category][index][property] = value;

      return updatedData;
    });
  };
  const [colorImages, setColorImages] = useState([]);
  const handleFilesChange = (newFiles: any) => {
    setColorImages((prevImages) => [...prevImages, ...newFiles]);
    setValue("colorImages", [...colorImages, ...newFiles]);
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await createCombination(data);
      if (response?.status === "success") {
        const formSubmissionData: { [key: string]: any } = {};
        response.data.forEach((item: any, index: number) => {
          formSubmissionData[`combinations[${index}][_id]`] = item._id;
          formSubmissionData[`combinations[${index}][price]`] = item.price;
          formSubmissionData[`combinations[${index}][stock]`] = item.stock;
        });
        formSubmissionData["colorImages"] = colorImages;
        setStepData(formSubmissionData);
      } else {
        console.error("Failed to create combination:", response?.message);
      }
    } catch (error) {
      console.error("Error during combination creation:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <form className="w-full max-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
        {/* Size Input */}
        <div className="flex justify-between items-center mt-5 mb-2">
          <h3 className="font-semibold">الحجم</h3>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className="group inline-flex h-5 w-10 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 -translate-x-1 rounded-full bg-white transition group-data-[checked]:-translate-x-6" />
          </Switch>
        </div>
        {sizeFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <Input
              placeholder="أدخل الحجم"
              {...register(`sizes.${index}.name`, { required: field.enabled })}
              onChange={(e) =>
                handleLiveDataChange(`sizes.name`, e.target.value, index)
              }
              className="w-full"
            />
            <button type="button" onClick={() => removeSize(index)}>
              <DeleteIcon className="w-6 h-6 text-gray-800" />
            </button>
            <button
              type="button"
              onClick={() =>
                appendSize({ enabled: false, name: "", quantity: 0 })
              }
              className="font-semibold"
            >
              +
            </button>
          </div>
        ))}

        {/* Style Input */}
        <div className="flex justify-between items-center mt-5 mb-2">
          <h3 className="font-semibold">الستايل</h3>
          <Switch
            checked={enabled1}
            onChange={setEnabled1}
            className="group inline-flex h-5 w-10 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 -translate-x-1 rounded-full bg-white transition group-data-[checked]:-translate-x-6" />
          </Switch>
        </div>
        {styleFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <Input
              placeholder="أدخل الستايل"
              {...register(`styles.${index}.name`, { required: field.enabled })}
              onChange={(e) =>
                handleLiveDataChange(`styles.name`, e.target.value, index)
              }
              className="w-full"
            />
            <button type="button" onClick={() => removeStyle(index)}>
              <DeleteIcon className="w-6 h-6 text-gray-800" />
            </button>
            <button
              type="button"
              onClick={() => appendStyle({ enabled: false, name: "" })}
              className="font-semibold"
            >
              +
            </button>
          </div>
        ))}

        {/* Color Input */}
        <div className="flex justify-between items-center mt-5 mb-2">
          <h3 className="font-semibold">إعدادات اللون</h3>
          <Switch
            checked={enabled2}
            onChange={setEnabled2}
            className="group inline-flex h-5 w-10 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
          >
            <span className="size-4 -translate-x-1 rounded-full bg-white transition group-data-[checked]:-translate-x-6" />
          </Switch>
        </div>
        {colorFields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-2 mb-2">
            <div className="flex gap-2">
            <Input
              placeholder="أدخل اسم اللون"
              {...register(`colors.${index}.name`, { required: field.enabled })}
              onChange={(e) =>
                handleLiveDataChange(`colors.name`, e.target.value, index)
              }
            />
            <Input
              placeholder="أدخل درجة اللون"
              {...register(`colors.${index}.degree`, {
                required: field.enabled,
              })}
              onChange={(e) =>
                handleLiveDataChange(`colors.degree`, e.target.value, index)
              }
            />
              <button type="button" onClick={() => removeColor(index)}>
              <DeleteIcon className="w-6 h-6 text-gray-800" />
            </button>
            <button
              type="button"
              onClick={() =>
                appendColor({ enabled: false, name: "", degree: "" })
              }
              className="font-semibold"
            >
              +
            </button>
            </div>
            <FileUpload
              id="productImages"
              onFilesChange={handleFilesChange}
              fileClassName="max-w-[450px]"
            />

          </div>
        ))}

        {/* Display the live data in a combined table */}
        {liveData.sizes.length > 0 ||
        liveData.styles.length > 0 ||
        liveData.colors.length > 0 ? (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">النتائج</h3>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 " colSpan="3">
                    المتغيرات
                  </th>
                  <th className="border border-gray-300 p-2">العدد</th>
                </tr>
              </thead>
              <tbody>
                {liveData.sizes.map((size, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {size.name || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {liveData.styles[index]?.name || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {liveData.colors[index]?.name
                        ? `${liveData.colors[index].name} / ${liveData.colors[index].degree}`
                        : "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {size.quantity || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <div className="flex gap-3">
          <Button
            className="bg-primary text-white uppercase w-full mt-8"
            type="submit"
            buttonLoadingProps={{ loadingText: "Submitting..." }}
            loading={isMutating}
          >
            {"add"}
          </Button>
          <Button
            className="bg-white text-primary border-primary uppercase w-full mt-8"
            type="button"
            onClick={() => onPrev()}
          >
            {"previous"}
          </Button>
        </div>
      </form>
      <Button
        className="bg-primary text-white uppercase w-full mt-8"
        type="button"
        loading={updatingProduct}
        onClick={() => onSubmitAll()}
        buttonLoadingProps={{ loadingText: "updating..." }}
      >
        {"update"}
      </Button>
    </div>
  );
};

export default AddCombination;
