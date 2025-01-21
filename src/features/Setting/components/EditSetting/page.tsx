"use client";
import { Button, Checkbox, Input } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const EditSetting = ({ id }: { id: string }) => {
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_USER(id),
    "PATCH"
  );
  const { data, error, isLoading } = useSWRHook(
    API_SERVICES_URLS.GET_USER_ID(id)
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      birthDay: "",
      phoneNumber: "",
      guardianEmail: "",
      address: "",
    },
  });

  // Effect to reset form values when data is fetched
  useEffect(() => {
    if (data) {
      reset({
        name: data?.name || "",
        email: data?.email || "",
        birthDay: data?.birthDay || "",
        phoneNumber: data?.phoneNumber || "",
        guardianEmail: data?.guardianEmail || "",
        address: data?.address || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: any) => {
    const formattedData = {
      email: formData.email,
      name: formData.name,
      birthDay: formData.birthDay,
      phoneNumber: formData.phoneNumber,
      guardianEmail: formData.guardianEmail,
      address: formData.address,
    };

    try {
      const response = await customTrigger(formattedData);

      if (response.status === 200 || response.status === 201) {
        toast.success("User updated successfully!");
      } else {
        toast.error(`Failed to update user. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading user data.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white border rounded-md w-full mx-auto"
    >
      <h1 className="text-3xl font-semibold text-primary mb-4">Edit setting</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-4">
        <div>
          <Input
            type="text"
            label="Number of Computers"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input
            type="date"
            label="Start Time"
            {...register("startTime", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="End Time"
            {...register("endTime ", {
              required: "Date of Birth is required",
            })}
            label="BirthDay"
          />
          {errors.birthDay && (
            <p className="text-red-500 text-sm mt-1">
              {errors.birthDay.message}
            </p>
          )}
        </div>

        <Input
          label="Session Duration/ hh"
          type="tel"
          {...register("sessionDuration")}
        />
        <Input
          label="Session Cost / $"
          type="text"
          {...register("sessionCost")}
        />
      </div>

      <Button
        type="submit"
        disabled={isMutating}
        className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 mx-auto mt-5"
      >
        {isMutating ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default EditSetting;
