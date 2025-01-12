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
    <div className="bg-[#FAFCFE] ">
        <div className="flex gap-10">
          <SideBar />
          <div className="mt-8 w-full max-w-5xl pr-4">{children}</div>
        </div>
    </div>
  );
}
