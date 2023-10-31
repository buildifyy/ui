import Select, {
  MultiValue,
  components,
  OptionProps,
  MultiValueProps,
} from "react-select";

export interface FilterOption {
  readonly label: string;
  readonly value: string;
}

interface FilterProps {
  readonly options: FilterOption[];
  readonly selectedValues?: string[];
  readonly setSelectedValues: (data: string[]) => void;
  readonly placeholderText: string;
  readonly isDisabled?: boolean;
}

export const Filter = ({
  options,
  selectedValues,
  setSelectedValues,
  placeholderText,
  isDisabled,
}: FilterProps) => {
  const InputOption = (props: OptionProps<FilterOption>) => {
    return (
      <div className="px-2 my-2">
        <components.Option {...props} className="rounded-2xl">
          <input type="checkbox" checked={props.isSelected} />
          <span className="ml-2 text-sm">{props.children}</span>
        </components.Option>
      </div>
    );
  };

  const MultiValue = (props: MultiValueProps<FilterOption>) => {
    return (
      !props.index && (
        <components.SingleValue {...props}>
          <span className="text-sm text-gray-400">
            {selectedValues?.length} selected
          </span>
        </components.SingleValue>
      )
    );
  };

  const handleOnSelect = (options: MultiValue<FilterOption>) => {
    if (Array.isArray(options)) {
      setSelectedValues(options.map((opt) => opt.value));
    }
  };

  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      closeMenuOnScroll={false}
      hideSelectedOptions={false}
      onChange={handleOnSelect}
      options={options}
      components={{ Option: InputOption, MultiValue }}
      placeholder={placeholderText}
      isDisabled={isDisabled}
      styles={{
        control: (provided) => ({
          ...provided,
          borderRadius: "16px",
          borderWidth: "1px",
          borderColor: "inherit",
          fontSize: "0.8rem",
          backgroundColor: "inherit",
        }),
        menu: (provided) => ({
          ...provided,
          width: "max-content",
          minWidth: "100%",
          borderRadius: "8px",
          borderWidth: "1px",
          backgroundColor: "hsl(var(--background))",
        }),
        option: (provided) => ({
          ...provided,
          borderRadius: "8px",
          backgroundColor: "inherit",
        }),
      }}
    />
  );
};
