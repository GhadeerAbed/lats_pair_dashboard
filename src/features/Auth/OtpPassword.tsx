
import {  OtpPass } from "./components/page";

export const OtpPassword = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 max-w-7xl  mx-auto ">
      <OtpPass />
      <div className="bg-gray-400 w-full h-full "></div>
    </div>
  );
};
export default OtpPassword;
