
import UserBooking from "@/features/Users/components/UserBooking/page";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <UserBooking id={id}/>
    </div>
  );
};

export default page;
