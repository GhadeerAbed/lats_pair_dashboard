import Link from "next/link";
import { cn } from "../../../utils/page";
import { FC } from "react";

interface NavItemProps {
  href: string;
  icon: JSX.Element;
  title: string;
  isActive: boolean;
}

export const ExpendedSideList: FC<NavItemProps> = ({ title, href, isActive, icon }) => {
  return (
    <li
      className={cn(
        isActive ? "text-primary" : "",
        "hover:text-primary  rounded-md px-3 py-2"
      )}
    >
      <Link href={href} className="flex flex-row items-center gap-2 ">
        <span className="w-6 h-6 flex-shrink-0">{icon}</span>
        <p className="text-base font-Sans font-medium ">{title}</p>
      </Link>
    </li>
  );
};

export default ExpendedSideList;
