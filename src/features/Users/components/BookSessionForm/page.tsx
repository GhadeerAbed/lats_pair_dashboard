"use client"
import { useState } from "react";
import { Button, Input } from "@/components/page";
import { useForm } from "react-hook-form";

interface BookSessionFormProps {
  id?: string;
  onSubmit: (sessionType: string, pairId?: string) => void;  // Add the prop for the submit handler
}

const BookSessionForm = ({ id, onSubmit }: BookSessionFormProps) => {
  const [sessionType, setSessionType] = useState<"ALONE" | "PAIR">("ALONE");

  const {
    register,
    handleSubmit: reactHookHandleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data: any) => {
    onSubmit(sessionType, data.pairId);  // Call the passed onSubmit handler with session type and pairId
  };

  return (
    <div className="max-w-[600px] mx-auto bg-white px-6">
      <h2 className="text-lg font-semibold mb-4">Book Your Session</h2>

      <form onSubmit={reactHookHandleSubmit(handleFormSubmit)}>
        {/* Session Type Selection */}
        <div className="mb-4 flex justify-between gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="ALONE"
              checked={sessionType === "ALONE"}
              onChange={() => setSessionType("ALONE")}
              className="accent-primary"
            />
            <span>Book alone</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="PAIR"
              checked={sessionType === "PAIR"}
              onChange={() => setSessionType("PAIR")}
              className="accent-primary"
            />
            <span>Pair with a partner</span>
          </label>
        </div>

        {/* Partner ID Input (Visible only if Pair is selected) */}
        {sessionType === "PAIR" && (
          <div className="mb-4">
            <Input
              label="Partner ID"
              type="text"
              {...register("pairId", { required: sessionType === "PAIR" })}
              placeholder="Enter partner ID"
            />
            {errors.pairId && <p className="text-red-500 text-sm">Partner ID is required</p>}
          </div>
        )}

        <Button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md mx-auto"
        >
          {sessionType === "ALONE" ? "Booking..." : "Next"}
        </Button>
      </form>
    </div>
  );
};

export default BookSessionForm;
