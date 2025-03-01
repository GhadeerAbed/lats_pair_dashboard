"use client";
import { BigModal, Button } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import React, { useState } from "react";
import UserPreferencesForm from "../UserPreferencesForm/page";
import EditPassword from "../EditPassword/page";

const UserPrefProfile = ({ id }: { id: string }) => {
  const {
    data: user,
    error: userError,
    isLoading: isUserLoading,
  } = useSWRHook(API_SERVICES_URLS.GET_REF_USER_USERID(id));
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className=" mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <div>
          <div className="flex justify-between ">
            <h2 className="text-lg font-medium text-secondary">
              User Preferences
            </h2>
            <Button
              className="bg-primary text-white"
              onClick={() => setOpenModal(true)}
            >
              Edit
            </Button>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div>
              <p className="pb-2">Language</p>
              <p>{user?.language}</p>
            </div>
            <div>
              <p className="pb-2">Skill Level</p>
              <p>{user?.skillLevel}</p>
            </div>
            <div>
              <p className="pb-2 capitalize">partner Skill Level</p>
              <p>{user?.partnerSkillLevel}</p>
            </div>

            <div>
              <p className="pb-2 capitalize">project Role</p>
              <p>{user?.projectRole}</p>
            </div>
            <div>
              <p className="pb-2 uppercase">os</p>
              <p>{user?.os}</p>
            </div>
          </div>
        </div>
      </div>
      <BigModal isOpen={openModal} closeModal={() => setOpenModal(false)}>
        <UserPreferencesForm isEdit={true} userId={user?.id}/>
      </BigModal>
    </>
  );
};

export default UserPrefProfile;
