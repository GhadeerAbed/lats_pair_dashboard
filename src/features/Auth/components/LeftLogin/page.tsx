"use client";
import { Button, Checkbox, Input, useAuth } from "../../../../components/page";
import { useForm } from "react-hook-form";
import { SignInFormInputsType } from "../../types/page";
import { API_SERVICES_URLS, FORM_VALIDATION } from "../../../../data/page";
import { getFieldHelperText } from "../../../../utils/page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../lib/axios/page";
import Link from "next/link";

export const LeftLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputsType>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setIsAuthenticated, updateUserData } = useAuth();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(API_SERVICES_URLS.LOGIN, data);
      if (response.status === 200) {
        updateUserData(response.data);
        console.log(response.data);
        setIsAuthenticated(true);
        router.push(`/dashboard`);
      }
    } catch (error: any) {
      console.error("Login failed", error.response?.data || error.message);
      setErrorMessage("Invalid Log In Credentials");
    }
  });

  return (
      <form className="w-full" onSubmit={onSubmit}>
        <div className="px-14 mt-52">
          <h1 className="text-[#0D92F4] text-2xl font-semibold mb-6">
            Sign In
          </h1>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            className="mb-5"
            {...register("email", FORM_VALIDATION.email)}
            error={!!errors.email}
            helperText={getFieldHelperText("error", errors.email?.message)}
          />
          <Input
            type="password"
            placeholder={"Password"}
            id="password"
            {...register("password", FORM_VALIDATION.password)}
            error={!!errors.password}
            helperText={getFieldHelperText("error", errors.password?.message)}
          />
          <Button
            className="bg-primary text-white uppercase w-full mt-10 "
            type="submit"
            buttonLoadingProps={{ loadingText: "Sign In..." }}
            loading={isSubmitting}
          >
            {"Sign In"}
          </Button>
         
          {errorMessage && (
            <div className="mt-5 text-sm text-red-500 text-center">
              {errorMessage}
            </div>
          )}
        </div>
      </form>
  
  );
};

export default LeftLogin;
