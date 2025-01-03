"use client";
import { Button, Checkbox, Input, useAuth } from "../../../../components/page";
import { useForm } from "react-hook-form";
import { SignInFormInputsType } from "../../types/page";
import { API_SERVICES_URLS, FORM_VALIDATION } from "../../../../data/page";
import { getFieldHelperText } from "../../../../utils/page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../lib/axios/page";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export const LeftRegister = () => {
  const locale = useLocale();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputsType>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setIsAuthenticated, updateUserData } = useAuth();
  const router = useRouter();
  const t = useTranslations();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(API_SERVICES_URLS.SIGNUP, data);
      if (response.status === 200) {
        console.log("Login successful", response.data);
        updateUserData(response.data.data);
        setIsAuthenticated(true);
        router.push(`/${locale}/register/success`);
      }
    } catch (error: any) {
      console.error("Login failed", error.response?.data || error.message);
      setErrorMessage("Invalid Log In Credentials");
    }
  });

  return (
    <div className="font-Sans w-[400px] mr-20">
      <form  onSubmit={onSubmit}>
        <div className=" bg-white rounded-lg shadow-DivShadow py-10  px-10 ">
          <p className="text-4xl font-bold pb-8">{t("register")}</p>
          <Input
            type="text"
            label={t("full_name")}
            id="name"
            className="mb-5"
            {...register("name", FORM_VALIDATION.name)}
            error={!!errors.name}
            helperText={getFieldHelperText("error", errors.name?.message)}
          />
          <Input
            type="email"
            label={t("email_address")}
            id="email"
            className="mb-5"
            {...register("email", FORM_VALIDATION.email)}
            error={!!errors.email}
            helperText={getFieldHelperText("error", errors.email?.message)}
          />
          <Input
            type="password"
            label={t("password")}
            id="password"
            {...register("password", FORM_VALIDATION.password)}
            error={!!errors.password}
            helperText={getFieldHelperText("error", errors.password?.message)}
          />
          <div className="flex justify-between items-center ">
            <div className="flex items-center text-darkSecondary text-[14px]">
              <Checkbox /> <span className="px-2">{t("remember_me")}</span>
            </div>
          </div>
          <Button
            className="bg-primary text-white uppercase w-full mt-10 "
            type="submit"
            buttonLoadingProps={{ loadingText: "Login In..." }}
            loading={isSubmitting}
          >
            {t("login_button")}
          </Button>
          <p className="text-center pt-5 text-fontColor1">
            {t("have_account1")}
            <Link className="font-medium underline" href={`/${locale}/login`}>{t("register_now1")}</Link>
          </p>
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

export default LeftRegister;
