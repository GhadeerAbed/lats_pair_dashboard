"use client";
import { Button, Checkbox, Input } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const EditPassword = () => {
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_USER,
    "POST"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const formattedData = {
      password: data.password,
    };

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
      toast.error("Failed to create user. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border bg-white rounded-md  w-full mx-auto"
    >
      <h1 className="text-3xl font-semibold  text-primary mb-4">
        Edit Password
      </h1>
      <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
        <div>
          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=!]{8,}$/,
                message: "Password must contain at least 1 letter and 1 number",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <Input
            type="password"
            label="NewPassword"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=!]{8,}$/,
                message: "Password must contain at least 1 letter and 1 number",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value, { password }) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
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

export default EditPassword;
