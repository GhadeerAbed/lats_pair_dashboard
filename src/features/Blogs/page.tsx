"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/page";
import { useRouter } from "next/navigation";


export const AddBlogs = () => {
const router = useRouter();
  return (
    <div >
       <Image src="/blog.svg" alt="addBlogs" width={300} height={300} className="mx-auto mt-24"/>
       <p className="text-lg font-semibold text-center my-3">Blogs are empty, add your blogs</p>
       <Button className="bg-primary text-white uppercase mx-auto " onClick={() => {router.push("/dashboard/blogs/addBlogs")}}>Add Blog</Button>
    </div>
  );
};

export default AddBlogs;
