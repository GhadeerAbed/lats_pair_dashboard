import { Button, Input } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EditCustomerProfile = ({ id, category, onClose }: { id: string; category: any; onClose: any }) => {
  const { register, handleSubmit, reset } = useForm();
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.EDIT_CUSTOMER_PROFILE(id),
    "PATCH"
  );
  

  const [phone, setPhone] = useState("");

  // UseEffect to set initial values once category data is available
  useEffect(() => {
    if (category) {
      reset({
        firstName: category.firstName || "",
        lastName: category.lastName || "",
        email: category.email || "",
      });
      setPhone(category.phone || ""); // Initialize phone number
    }
  }, [category, reset]);

  const onSubmit = async (data: any) => {
    // Make sure we handle the trimmed data
    const formData = {
      firstName: data.firstName?.trim() || "",
      lastName: data.lastName?.trim() || "",
      email: data.email?.trim() || "",
      phoneNumber: phone?.trim() || "", 
    };

    try {
      await customTrigger(formData); // Send as JSON instead of FormData
      reset();
      setPhone(""); 
      onClose(); // Close the modal or popup after successful update
    } catch (error) {
      console.error("Failed to update customer profile:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <h1 className="bg-lightSecondary font-semibold p-2 text-lg rounded-md">
        Edit customer profile
      </h1>
      <p className="py-4">Edit the customer name and phone as needed.</p>
      
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <Input
          type="text"
          label="First Name"
          id="firstName"
          className="mb-5"
          {...register("firstName")}
        />

        {/* Last Name */}
        <Input
          type="text"
          label="Last Name"
          id="lastName"
          className="mb-5"
          {...register("lastName")}
        />

        {/* Phone Number */}
        <div className="w-full mb-5">
          <label htmlFor="phone">Phone Number</label>
          <PhoneInput
            country={"sa"} // Default country
            value={phone}
            onChange={(phone) => setPhone(phone)} // Update phone state
            inputProps={{
              name: "phoneNumber",
              required: true,
              autoFocus: true,
            }}
          />
        </div>

        {/* Email */}
        <Input
          type="text"
          label="Email"
          id="Email"
          className="mb-5 mt-5"
          {...register("email")}
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            className="bg-primary text-white uppercase w-full mt-8"
            type="submit"
            buttonLoadingProps={{ loadingText: "Updating..." }}
            loading={isMutating} // Loading state during update
          >
            Update
          </Button>

          <Button
            className="bg-white text-primary border-primary uppercase w-full mt-8"
            type="button"
            onClick={onClose} // Close button handler
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomerProfile;

