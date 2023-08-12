import React from "react";
import "./Select.css";

export interface SelectData {
  id: string;
  value: string | number;
}

interface SelectProps {
  readonly id?: string;
  readonly widthClassName?: string;
  readonly errorClassName?: string;
  readonly data?: SelectData[];
  readonly isDisabled?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { id, widthClassName, errorClassName, data, isDisabled, ...rest } =
      props;
    return (
      <select
        id={id}
        ref={ref}
        className={`-ml-[2px] mt-1.5 ${widthClassName} rounded-lg border-gray-300 text-gray-700 py-2 px-2 border text-xs ${errorClassName}`}
        {...rest}
        disabled={isDisabled}
      >
        <option value="">Please select</option>
        {data?.map((d) => (
          <option value={d.id} key={d.id}>
            {d.value}
          </option>
        ))}
      </select>
    );
  },
);
