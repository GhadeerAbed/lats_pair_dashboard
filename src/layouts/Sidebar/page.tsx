"use client";
import { cn } from "../../utils/page";
import { ExpendedSide } from "../components/page";

export const SideBar = () => {
  // const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          "w-[210px] bg-white  shadow-sideShadow border-l-2 transition-all duration-500 ease transform min-h-screen"
        )}
      >
        <div className="mt-10">
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
