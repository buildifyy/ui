import React from "react";
import "./Select.css";
import { Dropdown } from "@/models";

interface SelectProps {
  readonly id?: string;
  readonly widthClassName?: string;
  readonly errorClassName?: string;
  readonly data?: Dropdown[];
  readonly isDisabled?: boolean;
  readonly onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { id, widthClassName, errorClassName, data, isDisabled, ...rest } =
      props;

    return (
      <select
        id={id}
        ref={ref}
        className={`-ml-[2px] mt-1.5 ${widthClassName} rounded-lg py-2 px-2 border text-sm ${errorClassName}`}
        disabled={isDisabled || !data}
        {...rest}
      >
        <option value="">Please select</option>
        {data?.map((d) => (
          <option value={d.value} key={d.value}>
            {d.label}
          </option>
        ))}
      </select>
    );
  },
);
