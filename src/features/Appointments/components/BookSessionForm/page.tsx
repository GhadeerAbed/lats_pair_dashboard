import { useState } from "react";
import { useForm } from "react-hook-form";

const BookSessionForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [sessionType, setSessionType] = useState("alone");

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Book Your Session</h2>

      {/* Session Type Selection */}
      <div className="mb-4 flex gap-4">
        <label
          className={`p-3 border rounded-md cursor-pointer ${
            sessionType === "alone"
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            value="alone"
            {...register("sessionType", { required: true })}
            onChange={() => setSessionType("alone")}
            className="hidden"
          />
          Book alone
        </label>

        <label
          className={`p-3 border rounded-md cursor-pointer ${
            sessionType === "partner"
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            value="partner"
            {...register("sessionType", { required: true })}
            onChange={() => setSessionType("partner")}
            className="hidden"
          />
          Pair with a partner
        </label>
      </div>

      {/* Conditional Fields */}
      {sessionType === "partner" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Partner&apos;s ID
          </label>
          <input
            type="text"
            {...register("partnerId", { required: "Partner ID is required" })}
            placeholder="Enter Partner's ID"
            className="mt-1 p-2 border w-full rounded-md"
          />
          {errors.partnerId && (
            <p className="text-red-500 text-sm">{errors.partnerId.message}</p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-blue-500 text-white py-2 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default BookSessionForm;
