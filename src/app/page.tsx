"use client";

import { Login } from "@/features/page";
import { getAuthData } from "@/utils/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const authData = getAuthData();

  useEffect(() => {
    if (authData) {
      router.replace(`/dashboard`);
    }
  }, [authData, router]);

  if (authData) {
    return null;
  }


  return (
    <Login />
  );
}

// const locale = useLocale();

// redirect(`/${locale}/dashboard`);
