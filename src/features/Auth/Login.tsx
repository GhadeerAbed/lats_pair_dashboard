import React from "react";
import { LeftLogin } from "./components/page";
import Image from "next/image";

export const Login = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
    <div className="bg-[#FAFCFE]">
    <LeftLogin />
    </div>
    <div className="bg-[#77CDFF] max-md:hidden">
      <Image src='/loginScreen.svg' alt="login" width={500} height={500} className="mx-auto mt-24"/>
    </div>
  </div>
  );
};
export default Login;
