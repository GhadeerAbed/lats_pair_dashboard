"use client";
import { useForm } from "react-hook-form";
import { Button, Input } from "../../../../components/page";
import { API_SERVICES_URLS, FORM_VALIDATION } from "@/data/page";
import { getFieldHelperText } from "@/utils/page";
import { useSWRMutationHook } from "@/hooks/page";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export const ForgetPass = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter(); 

  const { customTrigger: sendToEmail } = useSWRMutationHook(
    API_SERVICES_URLS.FORGET_PASSWORD,
    "POST"
  );

  // Handle form submission
  const onSubmit = async (data: { email: string }) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      const response = await sendToEmail({
        email: data.email,
      });

      if (response?.status === "success" && response.data) {
        const adminId = response.data.adminId;
        setSuccessMessage(response.data.message);
        localStorage.setItem("adminId", adminId);
        localStorage.setItem("email", data.email);
        router.replace(`/login/verification`);
      } else {
        setErrorMessage("email_send_error"); // Handle specific error if needed
      }
    } catch (error) {
      setErrorMessage("email_send_error"); // Handle failure
    }
  };

  return (
    <div className="font-Sans max-w-[400px] mr-20">
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className=" rounded-lg shadow-DivShadow py-24 px-10 ">
          <p className="text-3xl font-bold pb-6">{"forget_password"}</p>
          <p className="pb-8 font-medium">{"password_sentence"}</p>
          <Input
            type="email"
            label={"email_address"}
            id="email"
            className="mb-5"
            {...register("email", FORM_VALIDATION.email)}
            error={!!errors.email}
            helperText={getFieldHelperText("error", errors.email?.message)}
          />
          <Button
            className="bg-primary text-white uppercase w-full mt-10"
            type="submit"
            buttonLoadingProps={{ loadingText: "Sending Email..." }}
            loading={isSubmitting}
          >
            {"next_button"}
          </Button>

          {/* Display error or success messages */}
          {errorMessage && (
            <div className="mt-5 text-sm text-red-500 text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mt-5 text-sm text-green-600 text-center">
              {successMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ForgetPass;


