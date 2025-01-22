"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BigModal, Button } from "@/components/page";
import { useRouter } from "next/navigation";
import { useSWRHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import Link from "next/link";
import BlogForm from "./Components/BlogForm/page";

export const AddBlogs = () => {
  const router = useRouter();
  const { data, mutate } = useSWRHook(API_SERVICES_URLS.GET_BLOGS);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  return (
    <>
      <div className="container mx-auto px-4">
        {data && data.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 ">
            {data.map((blog: any) => (
              <div
                key={blog.id}
                className="border rounded-lg shadow-md bg-white p-4"
              >
                <div className="relative">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="rounded-md"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      className="bg-white p-2 rounded-full shadow"
                      onClick={() => {
                        setSelectedBlogId(blog.id); // Set the selected blog ID
                        setOpenEditModal(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button className="bg-white p-2 rounded-full shadow">
                      🗑️
                    </button>
                  </div>
                </div>
                <h2 className="font-semibold mt-4">{blog.title}</h2>
                <p className="text-gray-500 text-sm py-1">
                  {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-gray-700 mt-2 line-clamp-1 ">
                  {blog.summary}
                </p>

                <Link
                  className="text-blue-500 mt-2 block"
                  href={`/dashboard/blogs/${blog.id}`}
                >
                  See More →
                </Link>
              </div>
            ))}
            <Button
              className="bg-primary text-white uppercase mx-auto h-10"
              onClick={() => {
                router.push("/dashboard/blogs/addBlogs");
              }}
            >
              Add Blog
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Image
              src="/blog.svg"
              alt="addBlogs"
              width={300}
              height={300}
              className="mx-auto mt-24"
            />
            <p className="text-lg font-semibold text-center my-3">
              Blogs are empty, add your blogs
            </p>
            <Button
              className="bg-primary text-white uppercase mx-auto"
              onClick={() => {
                router.push("/dashboard/blogs/addBlogs");
              }}
            >
              Add Blog
            </Button>
          </div>
        )}
      </div>
      <BigModal
        isOpen={openEditModal}
        closeModal={() => {
          setOpenEditModal(false);
          setSelectedBlogId(null); // Reset the selected ID when closing
        }}
      >
        <BlogForm id={selectedBlogId} />
      </BigModal>
    </>
  );
};

export default AddBlogs;
