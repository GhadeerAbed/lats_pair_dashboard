"use client"
import { Button, Input, Search, Select } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const OfferForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_OFFERS,
    "POST"
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        setDebouncedSearchTerm(searchTerm);
      }
    }, 300); 
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data} = useSWRHook(
    debouncedSearchTerm ? API_SERVICES_URLS.SEARCH_PRODUCTS(debouncedSearchTerm) : null
  );

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };



  const onSubmit = handleSubmit(async (formData) => {
    try {
      const productIds =
        data?.data?.map((product: any) => product._id) || [];
      const payload = {
        name: {
          ar: formData.name?.ar,
          en: formData.name?.en,
        },
        products: productIds,
        discountCode: formData.discountCode,
        discountValue: Number(formData.discountValue),
        typeOffer: formData.typeOffer,
        startOfferDate: formData.startOfferDate,
        endOfferDate: formData.endOfferDate,
      };

      await customTrigger(payload);
    } catch (error) {
      setErrorMessage(("error_message"));
    }
  });

  const options = [
    {
      name: "خصم على المبلغ الكلي",
      value: "Discount on total amount",
    },
    {
      name: "الخصم على الطلب",
      value: "Discount on order",
    },
    {
      name: "اشتري X واحصل على Y",
      value: "Buy one get one",
    },
    {
      name: "الشحن مجاناً ",
      value: "Free shipping",
    },
  ];

  return (
    <div className="font-Sans bg-white p-5">
      <h1 className="font-semibold text-lg ">{("add_offer")}</h1>
      <p className="py-4 text-sm">{("offer_form")}</p>
      <form onSubmit={onSubmit} className="w-[500px]">
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <Input
            type="text"
            label={("offer_name_ar")}
            id="name"
            className="mb-5"
            {...register("name.ar")}
          />
          <Input
            type="text"
            label={("offer_name_en")}
            id="name"
            className="mb-5"
            {...register("name.en")}
          />
        </div>
        <p>{("offer_products")}</p>
        <Search setSearch={handleSearchSubmit} />
        {data?.data?.map((product: any) => (
          <li key={product._id}>{product._id}</li>
        ))}
        <div className="relative mt-5 mb-5">
          <Link
            href={`/dashboard/coupon`}
            className="text-primary text-sm font-medium underline absolute left-0 cursor-pointer "
          >
            {("create_random_code")}
          </Link>
          <div className="flex flex-col">
            <label htmlFor="offerCode text-sm">{("offer_code")}</label>
            <input
              type="text"
              id="offerCode"
              {...register("discountCode")}
              className="mt-1 border border-borderColor rounded-lg py-[10px] "
            />
          </div>
        </div>
        <Input
          type="text"
          label={("offer_value")}
          id="offerValue"
          {...register("discountValue")}
        />
        <Select
          options={options}
          label={("offer_type")}
          id="offerType"
          {...register("typeOffer")}
        />
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
          <Input
            type="date"
            label={("offer_start")}
            id="offerStart"
            {...register("startOfferDate")}
          />
          <Input
            type="date"
            label={("offer_end")}
            id="offerEnd"
            {...register("endOfferDate")}
          />
        </div>
        <div className="flex gap-4">
          <Button
            className="bg-primary text-white uppercase w-full mt-10"
            type="submit"
            buttonLoadingProps={{ loadingText: "saving..." }}
            loading={isSubmitting}
          >
            {("save_offer")}
          </Button>
          <Button
            className="bg-white text-primary uppercase w-full mt-10"
            type="button"
          >
            {("cancel")}
          </Button>
        </div>
        {errorMessage && (
          <div className="mt-5 text-sm text-red-500 text-center">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default OfferForm;


