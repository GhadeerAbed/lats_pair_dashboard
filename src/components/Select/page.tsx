
import { useMemo, forwardRef } from "react";
import type { SelectProps } from "../types/page";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      id,
      helperText,
      className,
      selectClassName,
      labelClassName,
      optionClassName,
      selectSize = "medium",
      options,
      placeholder,
      error = false,
      withoutHelperText = false,
      defaultValue,
      onChange,
      ...rest
    },
    ref
  ) => {
    const classNames = useMemo(() => {
      const classes = {
        selectContainer: `mb-1 relative text-gray-dark  ${className ?? ""}`,
        label: `block mb-2 text-fontColor1 text-sm font-[500] ${labelClassName ?? ""} ${
          error ? "peer-focus:text-red-600 peer-focus:dark:text-red font-Sans" : ""
        }`,
        select: `block w-full text-gray-dark border focus:ring-black text-sm focus:border-black rounded-lg border-borderColor   ${
          selectClassName ?? ""
        }`,
        helperText: "inline-flex min-h-[20px] text-xs mt-1",
        placeholder: "text-gray-200 font-Sans",
      };

      if (selectSize === "large") {
        classes.select += " py-4";
        classes.selectContainer += " text-lg";
      } else if (selectSize === "small") {
        classes.select += " py-2 text-sm";
        classes.selectContainer += " text-sm";
      } else {
        classes.select += " py-3";
        classes.selectContainer += " text-base";
      }

      if (error) {
        classes.select += " !border-red !focus:border-red";
      }

      return classes;
    }, [className, selectClassName, selectSize, labelClassName, error]);

    return (
      <div className={classNames.selectContainer}>
        {label && (
          <label htmlFor={id} className={classNames.label}>
            {label}
          </label>
        )}
        <select
          id={id}
          className={classNames.select}
          ref={ref}
          defaultValue={defaultValue}
          onChange={onChange}
          {...rest}
        >
          {placeholder && (
            <option className={classNames.placeholder} value="">
              {placeholder}
            </option>
          )}
          {options?.map((option) => (
            <option key={option.value} value={option.value} className={`text-fontColor1 ${optionClassName}`}>
              {option.name}
            </option>
          ))}
        </select>

        {!withoutHelperText && error && (
          <p className={classNames.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
