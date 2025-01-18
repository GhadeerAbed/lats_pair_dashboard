import { Button, Input, Select } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import React from "react";
import { useForm } from "react-hook-form";

export const EditOrder = ({ id }:{  id: string}) => {
  const { register, handleSubmit } = useForm();
  const { customTrigger } = useSWRMutationHook(API_SERVICES_URLS.EDIT_ORDER(id), "PATCH");

  const options1 = [
    { value: "Pending", name: "Pending" },
    { value: "Completed", name: "Completed" },
    { value: "Cancelled", name: "Cancelled" },
    { value: "In progress", name: "In progress" },
  ];
  const options2 = [
    { value: "On Hold", name: "On Hold" },
    { value: "Completed", name: "Completed" },
    { value: "Cancelled", name: "Cancelled" },
    { value: "In progress", name: "In progress" },
  ];

  const onSubmit = async (data:any) => {
    const body = {
      date: data.date,
      timeSlot: {
        startTime: data.startTime,
        endTime: data.endTime,
      },
      status: data.status,
      subStatus: data.subStatus,
      sessionDuration: data.sessionDuration,
    };

    await customTrigger(body);
  };

  return (
    <div className="bg-white w-[520px] p-6 rounded-md">
      <h1 className="bg-lightSecondary font-semibold p-2 text-lg rounded-md">Edit Order</h1>
      <p className="py-4">Edit the order details as needed.</p>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Order Date"
          id="order-date"
          className="mb-5"
          {...register('date')}
        />
        <div className="flex gap-3 mb-2">
          <Input
            type="text"
            label="Start Time"
            id="start-time"
            {...register('startTime')}
          />
          <Input
            type="text"
            label="End Time"
            id="end-time"
            {...register('endTime')}
          />
        </div>
        <Select
          label="Order Status"
          id="order-status"
          options={options1}
          placeholder=""
          selectClassName="pl-4 !py-3 !mb-4"
          {...register('status')}
        />
        <Select
          label="Sub Status"
          id="sub-status"
          options={options2}
          placeholder=""
          selectClassName="pl-4 !py-3 !mb-4"
          {...register('subStatus')}
        />
        <Input
          type="text"
          label="Session Duration"
          id="session-duration"
          className="mb-5"
          {...register('sessionDuration')}
        />
        <div className="flex gap-3">
          <Button
            className="bg-primary text-white uppercase w-full mt-8"
            type="submit"
            buttonLoadingProps={{ loadingText: "Updating..." }}
          >
            Update
          </Button>
          <Button
            className="bg-white text-primary border-primary uppercase w-full mt-8"
            type="button"
            onClick={() => { /* Handle cancel logic here */ }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
