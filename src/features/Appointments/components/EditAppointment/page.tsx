import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import React from "react";
import { useForm } from "react-hook-form";

const EditAppointment = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { customTrigger: updateSession, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_SESSION(id),
    "PATCH"
  );

  const onSubmit = async (data: any) => {
    const payload: any = { paymentStatus: data.paymentStatus };
    if (data.deletedFor) {
      payload.deletedFor = data.deletedFor;
    }

    try {
      await updateSession(payload);
      console.log("Session updated successfully:", payload);
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  return (
    <div className=" mx-auto bg-white p-6 ">
      <h2 className="text-xl font-semibold mb-6">Edit Appointment Session</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Payment Status */}
        <div>
          <p className="text-gray-700 font-medium mb-2">Select Payment Status</p>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="PAID"
                {...register("paymentStatus")}
                className="accent-blue-600"
              />
              <span>Paid</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="UNPAID"
                {...register("paymentStatus")}
                className="accent-primary"
              />
              <span>Unpaid</span>
            </label>
          </div>
          {errors.paymentStatus && (
            <p className="text-red-500 text-sm">{errors.paymentStatus.message}</p>
          )}
        </div>

        {/* Deleted For (Optional) */}
        <div>
          <p className="text-gray-700 font-medium mb-2">Select Deleted for (Optional)</p>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <input type="radio" value="RESCHEDULED" {...register("deletedFor")} className="accent-primary" />
              <span>Rescheduled</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="radio" value="CANCELLED" {...register("deletedFor")} className="accent-primary" />
              <span>Cancelled</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="radio" value="NON_SHOW" {...register("deletedFor")} className="accent-primary" />
              <span>Non Show</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isMutating}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isMutating ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditAppointment;
