"use client";
import { Button, Select } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRMutationHook } from "@/hooks/page";

import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

// Constants
const Languages = [
  { value: "JAVASCRIPT", name: "JavaScript" },
  { value: "PYTHON", name: "Python" },
  { value: "OPEN", name: "Open" },
];

const SkillLevels = [
  { value: "EXPLORER", name: "Explorer" },
  { value: "BUILDER", name: "Builder" },
  { value: "CREATOR", name: "Creator" },
];

const ProjectRoles = [
  { value: "TAKER", name: "Taker" },
  { value: "PROVIDER", name: "Provider" },
];

const OperatingSystems = [
  { value: "WINDOWS", name: "Windows" },
  { value: "MAC", name: "Mac" },
];

const PartnerSkillLevels = [
  { value: "EXPLORER", name: "Explorer" },
  { value: "BUILDER", name: "Builder" },
  { value: "CREATOR", name: "Creator" },
];

const UserPreferencesForm = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      language: "",
      skillLevel: "",
      partnerSkillLevel: "",
      projectRole: "",
      os: "",
    },
  });
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_USER_PREF,
    "POST"
  );

  const onSubmit = async (data: any) => {
    const formattedData = {
      userId: 15, // Replace with dynamic user ID if needed
      ...data,
    };

    try {
      const response = await customTrigger(formattedData);

      if (response.status === 201) {
        toast.success("Preferences saved successfully!");
      } else {
        toast.error(`Failed to save preferences. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save preferences. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-md rounded-md  w-full mx-auto"
    >
      <h2 className="text-3xl font-semibold  text-primary mb-4">
        User Preferences
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 mt-4">
        <div>
          <Select
            {...register("language", { required: "Language is required" })}
            label="What language do you like to code in:"
            options={Languages}
            placeholder="Select a language"
          />
          {errors.language && (
            <p className="text-red-500 text-sm mt-1">
              {errors.language.message}
            </p>
          )}
        </div>

        <div>
          <Select
            {...register("skillLevel", { required: "skill Level is required" })}
            label="What skill level are you:"
            options={SkillLevels}
            placeholder="Select your skill level"
          />
          {errors.skillLevel && (
            <p className="text-red-500 text-sm mt-1">
              {errors.skillLevel.message}
            </p>
          )}
        </div>
        <div>
          <Select
            {...register("partnerSkillLevel", {
              required: "partnerSkillLevel is required",
            })}
            label="What skill level would you like your pair to be:"
            options={PartnerSkillLevels}
            placeholder="Select partner skill level"
          />
          {errors.partnerSkillLevel && (
            <p className="text-red-500 text-sm mt-1">
              {errors.partnerSkillLevel.message}
            </p>
          )}
        </div>

        <div>
          <Select
            {...register("projectRole", {
              required: "projectRole is required",
            })}
            label="Are you a project taker or provider:"
            options={ProjectRoles}
            placeholder="Select your role"
          />
          {errors.projectRole && (
            <p className="text-red-500 text-sm mt-1">
              {errors.projectRole.message}
            </p>
          )}
        </div>
        <div>
          <Select
            {...register("os", { required: "OS is required" })}
            label="What is your preferred operating system:"
            options={OperatingSystems}
            placeholder="Select OS"
          />
          {errors.os && (
            <p className="text-red-500 text-sm mt-1">{errors.os.message}</p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="px-8 py-2 text-white bg-primary mx-auto"
        disabled={false /* Add loading state if needed */}
      >
        Save
      </Button>
    </form>
  );
};

export default UserPreferencesForm;
