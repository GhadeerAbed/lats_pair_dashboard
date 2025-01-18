import { AddUserForm } from "@/features/Users/components/page";
import SetupUser from "@/features/Users/components/SetupUser/page";
import React from "react";

const page = () => {
  return (
    <div>
      <AddUserForm />
      <SetupUser />
    </div>
  );
};

export default page;
