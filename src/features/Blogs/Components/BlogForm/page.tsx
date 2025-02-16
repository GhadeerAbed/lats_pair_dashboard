"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, FileInput, Input } from "@/components/page";
import { useSWRHook, useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { toast } from "sonner";

type BlogFormData = {
  title: string;
  content: string;
  published: boolean;
  slug: string;
  category: string;
  coverImage: string;
  summary: string;
};

const BlogForm: React.FC<{ id?: string }> = ({ id }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>();

  // Fetch blog data if `id` exists (for editing)
  const { data } = useSWRHook(id ? API_SERVICES_URLS.GET_BLOG_ID(id) : "");

  // API hooks for creating and updating
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_BLOGS,
    "POST"
  );
  const { customTrigger: updateTrigger, isMutating: isUpdateMutating } =
    useSWRMutationHook(id ? API_SERVICES_URLS.UPDATE_BLOG(id) : "", "PATCH");

  const { customTrigger: imageTrigger, isMutating: isImageMutating } =
    useSWRMutationHook(API_SERVICES_URLS.CREATE_URL_IMAGE, "POST");

  const [coverImage, setCoverImage] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("content", data.content);
      setValue("published", data.published);
      setValue("slug", data.slug);
      setValue("category", data.category);
      setValue("summary", data.summary);
      setValue("coverImage", data.coverImage); // Preserve existing coverImage URL
    }
  }, [data, setValue]);

  // Handle form submission (create or update)
  // const onSubmit = async (formData: BlogFormData) => {
  //   try {
  //     let coverImageUrl = formData.coverImage || "";

  //     // Upload new image if selected
  //     if (coverImage) {
  //       const formData = new FormData();
  //       formData.append("photo", coverImage);

  //       const imageResponse = await imageTrigger(formData);
  //       coverImageUrl = imageResponse?.image_link || "";
  //     }

  //     const blogData = {
  //       ...formData,
  //       coverImage: coverImageUrl,
  //     };

  //     if (id) {
  //       // Update existing blog
  //       await updateTrigger(blogData);
  //       toast.success("Blog updated successfully!");
  //     } else {
  //       // Create new blog
  //       await customTrigger(blogData);
  //       toast.success("Blog created successfully!");
  //       reset();
  //       setCoverImage(null);
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred. Please try again.");
  //   }
  // };

  const onSubmit = async (formData: BlogFormData) => {
    try {
      let coverImageUrl = formData.coverImage || ""; // Keep existing cover image if no new image is selected
  
      // Upload new image if selected
      if (coverImage && coverImage instanceof File) {
        const formDataImage = new FormData();
        formDataImage.append("photo", coverImage);
  
        const imageResponse = await imageTrigger(formDataImage);
  
        if (imageResponse?.status >= 400) {
          throw new Error(imageResponse?.message || "Image upload failed");
        }
  
        coverImageUrl = imageResponse?.image_link || "";
      }
  
      const blogData = {
        ...formData,
        coverImage: coverImageUrl, // Ensure this always gets included, whether updated or not
      };
  
      let response;
  
      if (id) {
        // Update existing blog
        response = await updateTrigger(blogData);
      } else {
        // Create new blog
        response = await customTrigger(blogData);
      }
  
      // Check for server errors
      if (response?.status >= 400) {
        throw new Error(response?.message || "An error occurred while saving the blog.");
      }else{
        toast.success(id ? "Blog updated successfully!" : "Blog created successfully!");
      }
  
     
  
      if (!id) {
        reset();
        setCoverImage(null); // Reset cover image after successful creation
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred. Please try again.");
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-md shadow-md w-full mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Blog" : "Create a Blog"}
      </h2>

      <FileInput
        onChange={(file) => setCoverImage(file)}
        profileImage={`${data?.coverImage}`}
      />

      <Input
        id="title"
        label="Title"
        type="text"
        {...register("title", { required: "Title is required" })}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <label className="block text-sm font-medium mb-1">Content</label>
      <textarea
        className="w-full p-2 border rounded-md"
        {...register("content", { required: "Content is required" })}
      />
      {errors.content && (
        <p className="text-red-500">{errors.content.message}</p>
      )}

      <Input
        label="Slug"
        id="slug"
        type="text"
        {...register("slug", { required: "Slug is required" })}
      />
      {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}

      <Input
        id="category"
        label="Category"
        type="text"
        {...register("category", { required: "Category is required" })}
      />
      {errors.category && (
        <p className="text-red-500">{errors.category.message}</p>
      )}

      <label className="block text-sm font-medium mb-1">Summary</label>
      <textarea
        className="w-full p-2 border rounded-md"
        {...register("summary", { required: "Summary is required" })}
      />
      {errors.summary && (
        <p className="text-red-500">{errors.summary.message}</p>
      )}

      <div className="flex items-center text-sm mt-2">
        <Checkbox {...register("published")} />
        <span className="px-2">Mark as Published</span>
      </div>

      <Button
        type="submit"
        className="bg-primary text-white px-6 py-2 mt-4"
        disabled={isMutating || isUpdateMutating || isImageMutating}
      >
        {isMutating || isUpdateMutating || isImageMutating
          ? "Submitting..."
          : id
          ? "Update Blog"
          : "Create Blog"}
      </Button>
    </form>
  );
};

export default BlogForm;
