"use client";

import { Button, Input } from "@/components/page";
import React from "react";
import useForm from "@/lib/react-hook-form/page";
import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const Coupon = () => {
  const { register, handleSubmit } = useForm();
  const t = useTranslations();
  const { customTrigger } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_COUPON,
    "POST"
  );

  const onSubmit = async (data: any) => {
    try {
      data.discountValue = Number(data.discountValue);
      await customTrigger(data);
      toast.success("Product updated successfully")
    } catch (error) {
      toast.error("Failed to update product")
    }
    
  };
  

  return (
    <div className="w-[700px] bg-white p-5 rounded-md">
      <h1 className="text-2xl font-bold">{t("create_random_code")}</h1>
      <form className="max-w-[400px] mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label={t("code")}
          placeholder="Coupon Code"
          id="code"
          className="mb-5"
          {...register("code")}
        />
        <Input
          type="date"
          label={t("expireDate")}
          id="expireDate"
          className="mb-5"
          {...register("expireDate")}
        />
        <Input
          type="number"
          label={t("DiscountValue")}
          id="discountValue"
          className="mb-5"
          {...register("discountValue")}
        />
        <Button type="submit" className="bg-primary text-white mt-5 w-full">
          {t("add")}
        </Button>
      </form>
    </div>
  );
};

export default Coupon;
