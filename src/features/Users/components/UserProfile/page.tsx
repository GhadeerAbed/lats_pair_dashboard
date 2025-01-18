"use client";
import { Button } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import React from "react";

const UserProfile = ({ id }: { id: string }) => {
  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useSWRHook(API_SERVICES_URLS.GET_USER_ID(id));

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-primary">{user?.name}</h1>
        </div>
        <div className=" flex space-x-4">
          <Button className="border-primary text-primary bg-white">
            Edit Password
          </Button>
          <Button className=" bg-primary text-white">
            Edit Personal Information
          </Button>
        </div>
      </div>

      <p className="text-secondary pt-4 pb-1">
        <span>Created:</span> {new Date(user?.createdAt).toLocaleDateString()}
      </p>
      <p className="text-secondary">
        <span>Last Update:</span>{" "}
        {new Date(user?.updatedAt).toLocaleDateString()}
      </p>
      <div className="mt-4 border-t py-4">
        <h2 className="text-lg font-medium text-secondary">
          Personal Information
        </h2>
        <div className="mt-2 grid grid-cols-3 gap-4">
          <div>
            <p className="pb-2">User ID:</p>
            <p>{user?.id}</p>
          </div>
          <div>
            <p className="pb-2">Email:</p>
            <p>{user?.email}</p>
          </div>
          <div>
            <p className="pb-2">Password:</p>
            <p>********</p>
          </div>

          <div>
            <p className="pb-2">Role:</p>
            <p>{user?.role}</p>
          </div>
          <div>
            <p className="pb-2">Email Verified:</p>
            <p>{user?.isEmailVerified ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
