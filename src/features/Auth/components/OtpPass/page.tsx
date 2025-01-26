"use client";

import { useSWRMutationHook } from "@/hooks/page";
import { API_SERVICES_URLS } from "@/data/page";
import { useState, useEffect } from "react";
import { Button, OtpInput } from "../../../../components/page";
import { useRouter } from "next/navigation";


export const OtpPass = () => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(59); 
  const router = useRouter(); 
 

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
        router.push(`/login/newPassword`);
      } else {
        setErrorMessage("otp verification failed");
      }
    } catch (error) {
      setErrorMessage("otp verification failed");
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
          <p className="text-3xl font-bold pb-6">{"Verification"}</p>
          <p className="pb-8 font-medium">{"Verification_sentence"}</p>

          <OtpInput onOtpChange={otpChangeHandler} error={!!errorMessage} />
          <Button
            className="bg-primary text-white uppercase w-full mt-10"
            type="submit"
            buttonLoadingProps={{ loadingText: "Verifying..." }}
            loading={isMutating} 
          >
            {"Send_button"}
          </Button>
          <p className="text-center  mt-4">{formatTime(timeLeft)}</p>

          {timeLeft === 0 && (
            <p className="text-sm mt-4">
              {"received_code"}{" "}
              <strong
                className="underline cursor-pointer"
                onClick={handleResendCode}
              >
                 {"resend_button"}
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
