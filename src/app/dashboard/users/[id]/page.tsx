import UserPrefProfile from "@/features/Users/components/UserPrefProfile/page";
import UserProfile from "@/features/Users/components/UserProfile/page";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <UserProfile id={id} />
      <UserPrefProfile  id={id} />
    </div>
  );
};

export default page;
