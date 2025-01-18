"use client";
import { Button } from "@/components/page";
import React, { useState } from "react";
import Image from "next/image";
import UserPreferencesForm from "../UserPreferencesForm/page";

export const SetupUser = () => {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <div>
      {showPreferences ? (
        <div className="mt-5">
        <UserPreferencesForm />
        </div>
      ) : (
        <div className="bg-white p-5 rounded-md shadow-md my-8">
          <div className="flex justify-between items-center">
            <h1 className="text-secondary">User Preferences</h1>
            <Button
              className="bg-primary text-white"
              onClick={() => setShowPreferences(true)}
            >
              Set up your user preferences
            </Button>
          </div>
          <Image
            src="/setUpPref.svg"
            alt="setUpPref"
            width={200}
            height={200}
            className="mx-auto mt-12"
          />
        </div>
      )}
    </div>
  );
};

export default SetupUser;
