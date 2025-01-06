"use client";

import { Button, Input, useAuth } from "../../../../components/page";
import { useSWRMutationHook } from "@/hooks/page";
import { useForm } from "react-hook-form";
import { API_SERVICES_URLS, FORM_VALIDATION } from "@/data/page";
import { useState } from "react";
import { getFieldHelperText } from "@/utils/page";
import { useRouter } from "next/navigation";

export const NewPass = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setIsAuthenticated, updateUserData } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    watch
  } = useForm();
  const router = useRouter(); 



  const { customTrigger: resetPassword } = useSWRMutationHook(
    API_SERVICES_URLS.RESET_PASSWORD,
    "POST"
  );

  const adminId = localStorage.getItem("adminId");

  const onSubmit = handleSubmit(async (data) => {
    const { newPassword, passwordConfirm } = data;

    // Check if new password matches confirmation
    if (newPassword !== passwordConfirm) {
      setError("passwordConfirm", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {

      const response = await resetPassword({
        adminId, // Admin ID from local storage
        newPassword, // Send the new password
      });

      if (response?.status === "success") {
        console.log("Password has been reset successfully");
        updateUserData(response.data.data);
        router.push((`/login`));
        
      } else {
        setErrorMessage("Failed to reset password");
      }
    } catch (error) {
      setErrorMessage("Error resetting password. Please try again.");
    }
  });

  return (
    <div className="font-Sans max-w-[400px] mr-20">
      <form  onSubmit={onSubmit}>
        <div className=" rounded-lg shadow-DivShadow py-16 px-10 ">
          <p className="text-3xl font-bold pb-6">{"new_password"}</p>
          <p className="pb-8 font-medium">{"new_password_sentence"}</p>

          {/* New Password Input */}
          <Input
            type="password"
            label={"new_password"}
            id="newPassword"
            {...register("newPassword", FORM_VALIDATION.newPassword)}
            error={!!errors.newPassword}
            helperText={getFieldHelperText("error", errors.newPassword?.message)}
          />

          {/* Confirm New Password Input */}
          <Input
            type="password"
            label={"confirm_new_password"}
            id="passwordConfirm"
            {...register("passwordConfirm", {
              ...FORM_VALIDATION.passwordConfirm,
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
            error={!!errors.passwordConfirm}
            helperText={getFieldHelperText("error", errors.passwordConfirm?.message)}
          />

          {/* Submit Button */}
          <Button
            className="bg-primary text-white uppercase w-full mt-10"
            type="submit"
            buttonLoadingProps={{ loadingText: "Resetting Password..." }}
            loading={isSubmitting}
          >
            {"confirm_button"}
          </Button>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-5 text-sm text-red-500 text-center">
              {errorMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPass;
