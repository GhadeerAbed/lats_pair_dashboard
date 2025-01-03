import type { Metadata } from "next";
import { SideBar } from "@/layouts/page";


export const metadata: Metadata = {
  title: "Screen",
  description:
    "An integrated platform for expansion and operation services for companies",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-gray-50">
        <div className="flex gap-10">
          <SideBar />
          <div className="mt-8 ">{children}</div>
        </div>
    </div>
  );
}
