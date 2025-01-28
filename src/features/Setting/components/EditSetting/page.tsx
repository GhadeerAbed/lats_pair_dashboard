"use client";
import { Button, Checkbox, Input } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const EditSetting = () => {
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_CONFIG(localStorage.getItem("settingsId")),
    "PATCH"
  );
  const { data: settings, error, isLoading } = useSWRHook(API_SERVICES_URLS.GET_CONFIG);
  const userSettings =
  Array.isArray(settings) && settings.length > 0 ? settings[0] : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numComputers: "",
      startDay: "",
      endDay: "",
      duration: "",
      // sessionCost: "",
    },
  });

  // Effect to reset form values when data is fetched
  useEffect(() => {
    if (userSettings) {
      reset({
        numComputers: userSettings?.numComputers || "",
        startDay: userSettings?.startDay || "",
        endDay: userSettings?.endDay || "",
        duration: userSettings?.duration || "",
        // sessionCost: userSettings?.sessionCost || "",
      });
    }
  }, [userSettings, reset]);

  const onSubmit = async (formData: any) => {
    const formattedData = {
      numComputers: formData.numComputers,
      startDay: formData.startDay,
      endDay: formData.endDay,
      duration: formData.duration,
      // sessionCost: formData.sessionCost,
    };

    try {
      const res = await customTrigger(formattedData);

      if (res.status >= 400) {
        toast.error(
          res.message || "An error occurred while deleting the user."
        );
      } else {
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
      <h1 className="text-3xl font-semibold text-primary mb-4">Edit setting</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-4">
        <div>
          <Input
            type="text"
            label="Number of Computers"
            {...register("numComputers")}
          />
        </div>
        <div>
          <Input type="text" label="Start Time" {...register("startDay")} />
        </div>

        <div>
          <Input
            type="text"
            placeholder="End Time"
            {...register("endDay")}
            label="End Time"
          />
        </div>

        <Input
          label="Session Duration/ hh"
          type="text"
          {...register("duration")}
        />
        {/* <Input
          label="Session Cost / $"
          type="text"
          {...register("sessionCost")}
        /> */}
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

export default EditSetting;
