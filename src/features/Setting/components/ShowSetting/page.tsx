"use client";
import { BigModal, Button } from "@/components/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useSWRHook } from "@/hooks/page";
import React, { useEffect, useState } from "react";
import { EditSetting } from "../page";

export const ShowSetting = () => {
  const {
    data: settings,
    error: settingsError,
    isLoading: isSettingsLoading,
  } = useSWRHook(API_SERVICES_URLS.GET_CONFIG);
  const [openModal, setOpenModal] = useState(false);

  // Extract the first item in the array if data is returned
  const userSettings =
    Array.isArray(settings) && settings.length > 0 ? settings[0] : null;

  useEffect(() => {
    if (userSettings?.id) {
      localStorage.setItem("settingsId", userSettings.id);
    }
  }, [userSettings]);

  if (isSettingsLoading) {
    return <p>Loading...</p>;
  }

  if (settingsError) {
    return <p className="text-red-500">Failed to load settings.</p>;
  }

  return (
    <>
      <div className="mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <div>
          <div className="flex justify-between">
            <h2 className="text-lg font-medium text-primary">Admin Setting</h2>
            <Button
              className="bg-primary text-white"
              onClick={() => setOpenModal(true)}
            >
              Edit
            </Button>
          </div>
          {userSettings ? (
            <div className="mt-2 grid grid-cols-3 gap-4">
              <div>
                <p className="pb-2">Number of Computers</p>
                <p>{userSettings.numComputers}</p>
              </div>
              <div>
                <p className="pb-2">Start Time</p>
                <p>{userSettings.startDay}</p>
              </div>
              <div>
                <p className="pb-2 capitalize">End Time</p>
                <p>{userSettings.endDay}</p>
              </div>
              <div>
                <p className="pb-2 capitalize">Session Duration (minutes)</p>
                <p>{userSettings.duration}</p>
              </div>
              {/* Optional field: Add default or fallback value if not provided */}
              {/* <div>
                <p className="pb-2 uppercase">Session Cost</p>
                <p>{userSettings.sessionCost || "Not Set"}</p>
              </div> */}
            </div>
          ) : (
            <p>No settings found.</p>
          )}
        </div>
      </div>
      <BigModal isOpen={openModal} closeModal={() => setOpenModal(false)}>
        <div>
          <EditSetting/>
        </div>
      </BigModal>
    </>
  );
};

export default ShowSetting;
