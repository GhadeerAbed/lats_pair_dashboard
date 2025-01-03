"use client"
import useOtpInput from "./useOtpInput";
import { Input } from "../page";
import { OtpInputType } from "../types/page";

export const OtpInput: OtpInputType = ({ onOtpChange, error = false }) => {
  const { otpFields, activeInputRef, onChange, onKeyDown, onFocus, onPaste } =
    useOtpInput(onOtpChange);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {otpFields.value.map((fieldValue, index) => {
        let inputClassName = "max-w-[45px]";
        if (index === 2) {
          inputClassName += "sm:ml-2";
        } else if (index === 3) {
          inputClassName += "sm:ml-2";
        }else{
          inputClassName += "sm:ml-2";
        }

        return (
          <Input
            key={index}
            inputMode="numeric"
            pattern="\d{1}"
            autoComplete="one-time-code"
            maxLength={1}
            value={fieldValue}
            onChange={onChange(index)}
            onKeyDown={onKeyDown(index)}
            onFocus={onFocus}
            onPaste={onPaste}
            ref={otpFields.activeIndex === index ? activeInputRef : null}
            className={inputClassName}
            inputSize="small"
            inputClassName="text-center"
            withoutHelperText
            error={error}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
