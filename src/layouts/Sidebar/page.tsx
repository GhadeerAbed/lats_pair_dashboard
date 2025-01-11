"use client";
import { cn } from "../../utils/page";
import { ExpendedSide } from "../components/page";
import Image from 'next/image'

export const SideBar = () => {
  // const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          "w-[250px] bg-white  shadow-sideShadow border-l-2 transition-all duration-500 ease transform min-h-screen"
        )}
      >
        <Image src='/logo.svg' width='200' height='200' alt='logo' className='mx-auto mt-5' />
        <div className="mt-10 pl-3">
          <ExpendedSide />
        </div>
      </aside>
    </>
  );
};


export default SideBar;

{
  /* <ul className=" flex flex-col justify-center items-center space-y-2 font-[300] !text-darkSecondary transition-shadow duration-300 ease-in-out">
{navbarData.map((item) => {
  const isActive = pathname === item.href;
  return (
    <li
      key={item.id}
      className={cn(
        isActive ? "bg-primary !text-white" : "",
        "hover:bg-primary hover:text-white rounded-full p-2"
      )}
    >
      <Link href={item.href}>{item.icon}</Link>
    </li>
  );
})}
</ul> */
}
