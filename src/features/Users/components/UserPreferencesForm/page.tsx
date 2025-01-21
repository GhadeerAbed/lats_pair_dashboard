import { Button, Select } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";

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

const UserPreferencesForm = ({ isEdit = false }: { isEdit?: boolean }) => {
  const id = localStorage.getItem("userIdPref");

  const {
    handleSubmit,
    control,
    setValue,
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

  const { customTrigger: updateTrigger, isMutating: isUpdateMutating } =
    useSWRMutationHook(API_SERVICES_URLS.UPDATE_USER_PREF(id), "PATCH");

  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useSWRHook(isEdit ? API_SERVICES_URLS.GET_REF_USER_ID(id) : null);

  // Populate form with initial data if in edit mode
  useEffect(() => {
    if (isEdit && user) {
      setValue("language", user.language);
      setValue("skillLevel", user.skillLevel);
      setValue("partnerSkillLevel", user.partnerSkillLevel);
      setValue("projectRole", user.projectRole);
      setValue("os", user.os);
    }
  }, [isEdit, user, setValue]);

  const onSubmit = async (data: any) => {
    const formattedData = isEdit
    ? data
    : { userId: localStorage.getItem("userId"), ...data }

    try {
      const res = isEdit
        ? await updateTrigger(formattedData)
        : await customTrigger(formattedData);

      if (res.status >= 400) {
        toast.error(res.message || "An error occurred.");
      } else {
        if (!isEdit) {
          localStorage.setItem("userIdPref", res.id);
        }
        toast.success(
          res.message ||
            (isEdit ? "Preferences updated!" : "Preferences saved!")
        );
      }
    } catch (error) {
      toast.error("Failed to save preferences. Please try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-6 bg-white ${
          isEdit ? " " : "shadow-md"
        } rounded-md w-full mx-auto`}
      >
        <h2 className="text-3xl font-semibold text-primary">
          {isEdit ? "Edit Preferences" : "User Preferences"}
        </h2>

        {isUserLoading ? (
          <p>Loading user preferences...</p>
        ) : (
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
                {...register("skillLevel", {
                  required: "Skill level is required",
                })}
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
                {...register("projectRole", {
                  required: "Project role is required",
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
            <div>
              <Select
                {...register("partnerSkillLevel", {
                  required: "Partner skill level is required",
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
          </div>
        )}
        <Button
          type="submit"
          className="px-8 py-2 text-white bg-primary mx-auto"
          disabled={isMutating || isUpdateMutating || isUserLoading}
        >
          {isEdit ? "Update" : "Save"}
        </Button>
      </form>
    </>
  );
};

export default UserPreferencesForm;
