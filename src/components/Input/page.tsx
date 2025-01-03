"use client";
import React, { useMemo, useState, forwardRef } from "react";
import usePasswordInput from "./usePasswordInput";
import type { InputProps } from "../types/page";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      helperText,
      className,
      inputClassName,
      startIcon,
      endIcon,
      inputSize = "medium",
      type = "text",
      error = false,
      withoutHelperText = false,
      labelClassName,
      focusableLabel = false,
      disabled = false,
      handleEndIcon = () => {},
      endIconClassName,
      startIconClassName,
      ...rest
    },
    ref
  ) => {
    const { passwordInputType, passwordInputIcon } =
      usePasswordInput(inputSize);

    const classNames = useMemo(() => {
      const classes = {
        inputContainer: `flex-1 mb-3 relative text-gray-dark ${
          className ?? ""
        }`,
        label: `block mb-2 text-fontColor1 text-sm font-[500] ${
          labelClassName ?? ""
        }`,
        icon: "absolute text-gray-400 select-none top-1/2 -translate-y-2/4",
        startIcon: `left-4 ${startIconClassName ?? ""}`,
        endIcon: `rtl:left-4 ltr:right-4 ${endIconClassName ?? ""}`,
        input: `block w-full border-borderColor focus:ring-black text-sm focus:border-black rounded-lg ${
          inputClassName || ""
        } ${disabled ? "bg-secondary" : ""}`,
        helperText: "inline-flex min-h-[20px] text-xs mt-1",
      };

      if (inputSize === "large") {
        classes.input += " py-8 px-5";
        classes.inputContainer += " text-lg";
      } else if (inputSize === "small") {
        classes.input += " py-3 px-3 text-sm";
        classes.inputContainer += " text-sm";
      } else {
        classes.input += " py-3 px-4";
        classes.inputContainer += " text-base";
      }

      if (error) {
        classes.input += " !border-red focus:border-red";
      }

      return classes;
    }, [
      className,
      labelClassName,
      startIconClassName,
      endIconClassName,
      inputClassName,
      disabled,
      inputSize,
      error,
    ]);

    const inputType = type === "password" ? passwordInputType : type;
    const inputEndIcon = type === "password" ? passwordInputIcon : endIcon;

    return (
      <div className={classNames.inputContainer}>
        {label && (
          <label htmlFor={id} className={classNames.label}>
            {label}
          </label>
        )}
        <div className="relative flex-1">
          {startIcon && (
            <span className={`${classNames.icon} ${classNames.startIcon}`}>
              {startIcon}
            </span>
          )}

          <input
            id={id}
            type={inputType}
            className={classNames.input}
            disabled={disabled}
            ref={ref}
            {...rest}
          />

          {inputEndIcon && (
            <span
              className={`${classNames.icon} ${classNames.endIcon} `}
              onClick={() => handleEndIcon()}
            >
              {inputEndIcon}
            </span>
          )}
        </div>
        {!withoutHelperText && error && (
          <p className={classNames.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
