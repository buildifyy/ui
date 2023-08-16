import Toggle from "react-toggle";
import React, { ChangeEventHandler } from "react";
import "./OnOff.css";

interface OnOffProps {
  readonly value?: boolean;
  readonly onChange?: ChangeEventHandler;
  readonly onBlur?: () => void;
  readonly disabled?: boolean;
}

export const OnOff = React.forwardRef<undefined, OnOffProps>((props) => {
  const { value, onChange, onBlur, disabled } = props;

  return (
    <Toggle
      icons={false}
      checked={value}
      onChange={onChange}
      disabled={disabled}
      onBlur={onBlur}
    />
  );
});
