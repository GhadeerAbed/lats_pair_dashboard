"use client";

import { Button, Input } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ProfileDetails = () => {
  const t = useTranslations();
  const { data, isLoading, error } = useSWRHook(
    API_SERVICES_URLS.GET_ADMAN_PROFILE
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
      description: "",
    },
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_ADMAN_PROFILE,
    "PATCH"
  );
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setValue("email", data.data.email || "");
      setValue("phoneNumber", data.data.phoneNumber || "");
      setValue("description", data.data.description || "");
      if (data.data.logoUrl) setLogoPreview(data.data.logoUrl);
      if (data.data.coverImageUrl) setCoverImagePreview(data.data.coverImageUrl);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    setServerError(null);
    const payload = {
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      description: formData.description,
    };

    try {
      const formDataToSend = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (logo) formDataToSend.append("logo", logo);
      if (coverImage) formDataToSend.append("coverImage", coverImage);

      await customTrigger(formDataToSend);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      setServerError("Failed to update profile. Please try again.");
    }
  };

  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  return (
    <div className="font-sans pb-10">
      <h1 className="font-bold text-lg">{t("Profile_Details")}</h1>
      <p className="w-[400px] font-md py-5 text-sm">{t("profile_form")}</p>
      <form className="w-full max-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <p className="text-red-500 text-sm mb-4">{serverError}</p>
        )}

        <Input
          type="email"
          label={t("email_address")}
          id="email"
          className="mb-5"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <Input
          type="text"
          label={t("phoneNumber")}
          id="phoneNumber"
          className="mb-5"
          {...register("phoneNumber")}
        />
        <div className="flex flex-col">
          <label htmlFor="description">{t("description")}</label>
          <textarea
            id="description"
            className="mb-5 py-5 mt-2 rounded-lg"
            {...register("description")}
          />
        </div>

        <div className="mb-5">
          <label>{t("logo")}</label>
          <div className="relative">
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setLogo, setLogoPreview)}
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <button className="py-3 bg-white border border-fontColor1 w-full rounded-lg mt-1">
              Choose File
            </button>
          </div>
          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="mt-2 w-20 h-20 object-cover"
            />
          )}
        </div>

        <div className="mb-5">
          <label>{t("coverImage")}</label>
          <div className="relative">
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setCoverImage, setCoverImagePreview)}
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
             <button className="py-3 bg-white border border-fontColor1 w-full rounded-lg mt-1">
              Choose File
            </button>
          </div>
          {coverImagePreview && (
            <img
              src={coverImagePreview}
              alt="Cover Image Preview"
              className="mt-2 w-40 h-20 object-cover"
            />
          )}
        </div>

        <div className="flex gap-3">
          <Button
            className="bg-primary text-white uppercase w-full mt-8"
            type="submit"
            loading={isSubmitting || isMutating}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
