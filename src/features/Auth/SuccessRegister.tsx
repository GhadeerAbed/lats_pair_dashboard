import React from "react";
import Image from "next/image";
import { Button } from "@headlessui/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
const SuccessRegister = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Image
        src={"/assest/register.svg"}
        alt="register"
        width={350}
        height={250}
      />
      <p className="text-xl font-medium mt-5">تم تفعيل حسابك! يمكنك الآن تسجيل الدخول</p>
      <p className="text-xl font-medium">البدء في استخدام خدماتنا.</p>
      <Button
        className="bg-primary text-white uppercase  mt-10 px-10 py-3 rounded-md "
        type="button"  
      >
        <Link href={`/${locale}/login`}>{t("login_button")}</Link>
      </Button>
    </div>
  );
};

export default SuccessRegister;
