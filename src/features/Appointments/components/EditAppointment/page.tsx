import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditAppointment = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue, // ✅ Ensures correct state updates
    formState: { errors },
  } = useForm({
    defaultValues: {
      paymentStatus: "UNPAID", // ✅ Ensures paymentStatus starts correctly
      deletedFor: null, // ✅ Prevents null issues
    },
  });

  const { customTrigger: updateSession, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.UPDATE_SESSION(id),
    "PATCH"
  );

  // ✅ Watch for form changes (debugging)
  const formValues = watch();
  console.log("Form Values:", formValues);

  const onSubmit = async (data: any) => {
    console.log("Final Submitted Data:", data);

    const payload: any = {
      paymentStatus: data.paymentStatus || "UNPAID", // ✅ Ensures it's always sent
    };

    // ✅ Only add `deletedFor` if selected
    if (data.deletedFor) {
      payload.deletedFor = data.deletedFor;
    }

    try {
      const res = await updateSession(payload);
      if (res.status >= 400) {
        toast.error(
          res.message || "An error occurred while updating the session."
        );
      } else {
        toast.success("Session updated successfully!");
      }
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  return (
    <div className="mx-auto bg-white p-6">
      <h2 className="text-xl font-semibold mb-6">Edit Appointment Session</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ✅ Payment Status */}
        <div>
          <p className="text-gray-700 font-medium mb-2">
            Select Payment Status
          </p>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="PAID"
                {...register("paymentStatus")}
                onChange={(e) => setValue("paymentStatus", e.target.value)} // ✅ Ensures correct updates
                className="accent-blue-600"
              />
              <span>Paid</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="UNPAID"
                {...register("paymentStatus")}
                onChange={(e) => setValue("paymentStatus", e.target.value)} // ✅ Fix for reset issue
                className="accent-primary"
              />
              <span>Unpaid</span>
            </label>
          </div>
          {errors.paymentStatus && (
            <p className="text-red-500 text-sm">
              {errors.paymentStatus.message}
            </p>
          )}
        </div>

        {/* ✅ Deleted For (Optional) */}
        <div>
          <p className="text-gray-700 font-medium mb-2">
            Select Deleted for (Optional)
          </p>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="CANCELLED"
                {...register("deletedFor")}
                onChange={(e) => setValue("deletedFor", e.target.value)} // ✅ Prevents resetting paymentStatus
                className="accent-primary"
              />
              <span>Cancelled</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="NOSHOW"
                {...register("deletedFor")}
                onChange={(e) => setValue("deletedFor", e.target.value)} // ✅ Prevents issue
                className="accent-primary"
              />
              <span>No Show</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="NA"
                {...register("deletedFor")}
                onChange={(e) => setValue("deletedFor", e.target.value)}
                className="accent-primary"
              />
              <span>Not Applicable</span>
            </label>
          </div>
        </div>

        {/* ✅ Submit Button */}
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
