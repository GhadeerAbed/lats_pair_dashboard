"use client";
import React, { useState } from "react";
import ProfileDetails from "./components/ProfileDetails/page";
import ProfileSecurity from "./components/ProfileSecurity/page";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cn } from "../../utils/page";
import { useTranslations } from "next-intl";

export const Profile = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const t = useTranslations()
  return (
    <div className="w-full">
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList
          className={
            "flex items-center flex-wrap whitespace-nowrap  gap-4 font-Sans text-[15px] font-[500] mt-5 bg-white p-2  lg:w-[900px]"
          }
        >
          <Tab
            className={({ selected }) =>
              cn(
                selected
                  ? "!bg-primary !text-white border-none "
                  : " text-primary border border-primary ",
                " rounded-lg py-2 uppercase text-primary border border-primary outline-none px-3"
              )
            }
          >
            {t("Profile_Details")}
          </Tab>

          <Tab
            className={({ selected }) =>
              cn(
                selected
                  ? "!bg-primary !text-white border-none "
                  : "text-primary border border-primary ",
                " rounded-md py-2 uppercase  border-primary text-primary outline-none px-8"
              )
            }
          >
            {t("Security")}
          </Tab>
        </TabList>
        <TabPanels
          className={"bg-white rounded-md  px-5 py-5 mt-6"}
        >
          <TabPanel>
            <ProfileDetails />
          </TabPanel>

          <TabPanel>
            <ProfileSecurity />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Profile;
