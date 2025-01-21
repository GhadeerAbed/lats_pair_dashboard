"use client";
import { Button, Checkbox, Input } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const EditUserForm = ({ id }: { id: string }) => {
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_USER(id),
    "PATCH"
  );
  const { data, error, isLoading } = useSWRHook(
    API_SERVICES_URLS.GET_USER_ID(id)
  );

  const originalEmailRef = useRef<string | null>(null);

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
      originalEmailRef.current = data?.email || null; // Store the original email
    }
  }, [data, reset]);

  const onSubmit = async (formData: any) => {
    const formattedData: any = {
      name: formData.name,
      birthDay: formData.birthDay,
      phoneNumber: formData.phoneNumber,
      guardianEmail: formData.guardianEmail,
      address: formData.address,
    };

    // Include email only if it has changed
    if (formData.email !== originalEmailRef.current) {
      formattedData.email = formData.email;
    }

    try {
      const res = await customTrigger(formattedData);

      if (res.status >= 400) {
        // Show error toast if status code is 400 or above
        toast.error(
          res.message || "An error occurred while deleting the user."
        );
      } else {
        // Show success toast for status codes below 400
        if (res.id) {
          localStorage.setItem("userId", res.id); // Save the ID in local storage
        }

        toast.success(res.message || "User deleted successfully!");
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
      <h1 className="text-3xl font-semibold text-primary mb-4">Edit User</h1>
      <h2>Personal Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-4">
        <div>
          <Input type="text" label="Name" {...register("name")} />
        </div>
        <div>
          <Input type="email" label="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            type="text"
            placeholder="dd-mm-yyyy"
            {...register("birthDay", {
              pattern: {
                value: /^\d{2}-\d{2}-\d{4}$/,
                message: "Format should be dd-mm-yyyy",
              },
            })}
            label="BirthDay"
          />
          {errors.birthDay && (
            <p className="text-red-500 text-sm mt-1">
              {errors.birthDay.message}
            </p>
          )}
        </div>

        <Input label="Phone Number" type="tel" {...register("phoneNumber")} />
        <Input
          type="text"
          {...register("guardianEmail")}
          label="Guardian Email"
        />
        <Input type="text" label="Address" {...register("address")} />
      </div>

      <div className="flex items-center text-darkSecondary text-[14px]">
        <Checkbox />
        <span className="px-2">I agree to the terms and conditions</span>
      </div>

      <Button
        type="submit"
        disabled={isMutating}
        className="bg-blue-500 text-white py-2 px-8 rounded-md hover:bg-blue-600 mx-auto mt-5"
      >
        {isMutating ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};

export default EditUserForm;
