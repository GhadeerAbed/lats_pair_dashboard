import React, { useEffect, useState } from "react";
import { useSWRHook } from "@/hooks/page";
import MultiSelectBox from "@/components/MultiSelectBox/page";
import { API_SERVICES_URLS } from "@/data/page";

export const TagsInput = ({
  register,
  setValue,
  initialValue = [],
}) => {
  const { data: tagsData } = useSWRHook(API_SERVICES_URLS.GET_TAGS);
  const [selectedTags, setSelectedTags] = useState(
    initialValue.map((tag:any) => ({ value: tag._id, label: tag.name }))
  );

  useEffect(() => {
    setValue("tags", initialValue.map((tag:any) => tag._id));
    register("tags");
  }, [register, setValue, initialValue]);

  const handleTagChange = (selectedOptions:any[]) => {
    const selectedIds = selectedOptions.map((option) => (option.value));
    setSelectedTags(selectedOptions);
    setValue("tags", selectedIds);

  };


  const tagOptions = Array.isArray(tagsData?.data)
    ? tagsData.data.map((tag:any) => ({
        value: tag._id,
        label: tag.name,
      }))
    : [];

  return (
    <MultiSelectBox
      value={selectedTags}
      onChange={handleTagChange}
      name="tags"
      options={tagOptions}
      defaultValue="Select Tags"
      label="Tags"
      selectClassName="!pl-3 "
    />
  );
};

export default TagsInput;
