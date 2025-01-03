import type { Metadata } from "next";
import "./globals.css";
import {  Navbar, SideBar } from "@/layouts/page";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/page";

export const metadata: Metadata = {
  title: "Screen",
  description:
    "An integrated platform for expansion and operation services for companies",
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;

}) {


  return (
    <html>
      <body>
        <Toaster
          richColors
          className="toaster"
          position="top-center"
          offset={5}
        />
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
      </body>
    </html>
  );
}
