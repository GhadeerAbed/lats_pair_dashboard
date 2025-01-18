"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, FileInput, Input } from "@/components/page";
import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";

type BlogFormData = {
  title: string;
  content: string;
  published: boolean;
  slug: string;
  category: string;
  coverImage: string;
  summary: string;
};

const BlogForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>();
  const { customTrigger, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.CREATE_BLOGS,
    "POST"
  );
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const onSubmit = async (data: BlogFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("published", String(data.published));
    formData.append("slug", data.slug);
    formData.append("category", data.category);
    formData.append("summary", data.summary);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      await customTrigger(formData);
      alert("Blog created successfully!");
      reset();
      setCoverImage(null); // Clear the image state
    } catch (error) {
      console.error("Failed to create blog:", error);
      alert("Failed to create blog. Please try again.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-5 rounded-md shadow-md w-full mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Create a Blog</h2>
      <FileInput
          onChange={(file) => setCoverImage(file)}
          profileImage={null} // Optionally pass an existing image URL
        />
      <div className="mb-4">
        <Input
          id="title"
          label="Title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          className={`w-full p-2 border rounded `}
          {...register("content", { required: "Content is required" })}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Input
          label="Slug"
          id="slug"
          type="text"
          {...register("slug", { required: "Slug is required" })}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm">{errors.slug.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Input
          id="category"
          label="Category"
          type="text"
          {...register("category", { required: "Category is required" })}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="summary">
          Summary
        </label>
        <textarea
          id="summary"
          className={`w-full p-2 border rounded `}
          {...register("summary", { required: "Summary is required" })}
        />
        {errors.summary && (
          <p className="text-red-500 text-sm">{errors.summary.message}</p>
        )}
      </div>

      <div className="flex items-center  text-[14px]">
        <Checkbox   {...register("published")}/> <span className="px-2">Mark as Published</span>
      </div>

      <Button
        type="submit"
        className="bg-primary text-white px-6 py-2 mx-auto mt-2"
        disabled={isMutating}
      >
        {isMutating ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default BlogForm;
