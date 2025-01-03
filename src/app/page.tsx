"use client";
import { Button } from "@/components/page";
import { getAuthData } from "@/utils/page";
import Link from "next/link";
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
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-20 mx-10 px-20">
      <div className="mt-20">
        <h1 className="text-4xl font-bold">
          منصة واحدة تُمكّنك من البيع في كل مكان{" "}
        </h1>
        <h2 className="text-3xl font-semibold py-5">
          سواء عبر الإنترنت أو في متجرك الفعلي.
        </h2>
        <h3 className="text-2xl font-medium">
          اجعل متجرك أقرب إلى عملائك أينما كانوا.
        </h3>
        <div className="flex gap-5 mt-8">
          <Link href={`/login`}>
            <Button className="bg-primary text-white px-10">
              تسجيل الدخول
            </Button>
          </Link>
          <Link href={`/register`}>
            <Button className="text-primary px-10 border border-primary">
              تسجيل الإشتراك
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-gray-400 w-[600px] h-[500px]"></div>
    </div>
  );
}

// const locale = useLocale();

// redirect(`/${locale}/dashboard`);
