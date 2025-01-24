import React from "react";
import { useForm } from "react-hook-form";

const EditAppointment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Send data to API here (e.g., fetch or axios)
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Edit Appointment Session</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Payment Status */}
        <div>
          <p className="text-gray-700 font-medium mb-2">
            Select Payment Status
          </p>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Paid"
                {...register("paymentStatus", {
                  required: "Payment status is required",
                })}
                className="accent-blue-600"
              />
              <span>Paid</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Unpaid"
                {...register("paymentStatus", {
                  required: "Payment status is required",
                })}
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

        {/* Deleted For */}
        <div>
          <p className="text-gray-700 font-medium mb-2">Select Deleted for</p>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Not applicable"
                {...register("deletedFor", {
                  required: "This field is required",
                })}
                className="accent-primary"
              />
              <span>Not applicable</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Cancelled"
                {...register("deletedFor", {
                  required: "This field is required",
                })}
                className="accent-primary"
              />
              <span>Cancelled</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Non Show"
                {...register("deletedFor", {
                  required: "This field is required",
                })}
                className="accent-primary"
              />
              <span>Non Show</span>
            </label>
          </div>
          {errors.deletedFor && (
            <p className="text-red-500 text-sm">{errors.deletedFor.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditAppointment;
