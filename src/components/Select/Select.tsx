import React from "react";
import "./Select.css";

interface SelectProps {
  readonly id?: string;
  readonly widthClassName?: string;
  readonly errorClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { id, widthClassName, errorClassName, ...rest } = props;
    return (
      <select
        id={id}
        ref={ref}
        className={`-ml-[2px] mt-1.5 ${widthClassName} rounded-lg border-gray-300 text-gray-700 py-2 px-2 border text-xs ${errorClassName}`}
        {...rest}
      >
        <option value="">Please select</option>
        <option value="JM">John Mayer</option>
        <option value="SRV">Stevie Ray Vaughn</option>
        <option value="JH">Jimi Hendrix</option>
        <option value="BBK">B.B King</option>
        <option value="AK">Albert King</option>
        <option value="BG">Buddy Guy</option>
        <option value="EC">Eric Clapton</option>
      </select>
    );
  }
);
