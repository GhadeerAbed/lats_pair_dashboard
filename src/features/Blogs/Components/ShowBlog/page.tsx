"use client";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import React from "react";
import Image from "next/image";

const ShowBlog = ({ id }: { id: string }) => {
  const { data } = useSWRHook(API_SERVICES_URLS.GET_BLOG_ID(id));

  if (!data) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className=" mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      {/* Blog Image */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <img
          src={data.coverImage}
          alt={data.title}
          className="rounded-md object-cover w-full h-full"
        />
      </div>

      {/* Blog Title and Date */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">{data.title}</h2>
        <p className="text-gray-500 text-sm mt-1">
          {new Date(data.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Blog Content */}
      <p className="text-gray-700 mt-4 leading-relaxed">{data.content}</p>
    </div>
  );
};

export default ShowBlog;
