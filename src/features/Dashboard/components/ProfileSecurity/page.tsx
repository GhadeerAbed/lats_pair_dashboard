"use client";
import { Button, Input } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import React from "react";
import { useForm } from "react-hook-form";

const ProfileSecurity = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();


  const { customTrigger: editPassword } = useSWRMutationHook(
    API_SERVICES_URLS.EDIT_CURRENT_PASS,
    "PATCH"
  );

  // Form submission handler
  const onSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    try {
      const response = await editPassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response?.status === "success") {
        // Handle success (e.g., show a success message or redirect)
        console.log("Password updated successfully");
      } else {
        // Handle API errors
        console.log(response?.message || "Error changing password");
      }
    } catch (error) {
      // Handle request errors
      console.error("Failed to update password", error);
    }
  };

  return (
    <div className="font-sans">
      <h1 className="font-bold text-lg">{t("change_password")}</h1>
      <p className="w-[400px] font-md py-5 text-sm">
      {("password_form")}
      </p>
      <form className="w-full max-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          label={("Current_password")}
          id="currentPassword"
          className="mb-5"
          {...register("currentPassword")}
        />
        <Input
          type="password"
          label={("New_password")}
          id="newPassword"
          className="mb-5"
          {...register("newPassword")}
        />
        <Input
          type="password"
          label={("Confirm_new_password")}
          id="confirmPassword"
          className="mb-5"
          {...register("confirmPassword")}
        />
        <div className="flex gap-3">
          <Button
            className="bg-primary text-white uppercase w-full mt-8 whitespace-nowrap"
            type="submit"
            buttonLoadingProps={{ loadingText: "Changing Password..." }}
            loading={isSubmitting}
          >
            {("change_password")}
          </Button>
          <Button
            className="bg-white text-primary border-primary uppercase w-full mt-8"
            type="button"
          >
            {("cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSecurity;
