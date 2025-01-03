"use client";

import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useState, useEffect } from "react";
import { Button, OtpInput } from "../../../../components/page";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export const OtpPass = () => {
  const t = useTranslations();
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(59); 
  const router = useRouter(); 
  const locale = useLocale();

  const { customTrigger: verifyOtp, isMutating } = useSWRMutationHook(
    API_SERVICES_URLS.VERIFY_CODE,
    "POST"
  );

  const otpChangeHandler = (value: string) => setCode(value);


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await verifyOtp({
        adminId: localStorage.getItem("adminId"),
        code,
      });

      if (response?.status === "success" && response.data) {
        // Handle success
        console.log(response.data.message);
        router.push(`/${locale}/login/newPassword`);
      } else {
        setErrorMessage(t("otp_verification_failed"));
      }
    } catch (error) {
      setErrorMessage(t("otp_verification_failed"));
    }
  };

  const { customTrigger: sendToEmail } = useSWRMutationHook(
    API_SERVICES_URLS.FORGET_PASSWORD,
    "POST"
  );

  const handleResendCode = async () => {
    const storedEmail = localStorage.getItem("email");

    if (storedEmail) {
      try {
        const response = await sendToEmail({
          email: storedEmail,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return; 

    const timerId = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timerId); 
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="font-Sans max-w-[400px] mr-20">
      <form  onSubmit={onSubmit}>
        <div className=" rounded-lg shadow-DivShadow py-16 px-10 ">
          <p className="text-3xl font-bold pb-6">{t("Verification")}</p>
          <p className="pb-8 font-medium">{t("Verification_sentence")}</p>

          <OtpInput onOtpChange={otpChangeHandler} error={!!errorMessage} />
          <Button
            className="bg-primary text-white uppercase w-full mt-10"
            type="submit"
            buttonLoadingProps={{ loadingText: "Verifying..." }}
            loading={isMutating} 
          >
            {t("Send_button")}
          </Button>
          <p className="text-center  mt-4">{formatTime(timeLeft)}</p>

          {timeLeft === 0 && (
            <p className="text-sm mt-4">
              {t("received_code")}{" "}
              <strong
                className="underline cursor-pointer"
                onClick={handleResendCode}
              >
                 {t("resend_button")}
              </strong>{" "}
            </p>
          )}

          {errorMessage && (
            <p className="text-sm text-red-500 text-center pt-5">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default OtpPass;
