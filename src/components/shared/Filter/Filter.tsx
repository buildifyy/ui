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
          <span className="ml-2 text-[0.9rem]">{props.children}</span>
        </components.Option>
      </div>
    );
  };

  const MultiValue = (props: MultiValueProps<FilterOption>) => {
    return (
      !props.index && (
        <components.SingleValue {...props}>
          <span className="text-xs">{selectedValues?.length} selected</span>
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
          fontSize: "0.9rem",
        }),
        menu: (provided) => ({
          ...provided,
          width: "max-content",
          minWidth: "100%",
          borderRadius: "8px",
        }),
        option: (provided) => ({
          ...provided,
          borderRadius: "8px",
        }),
      }}
    />
  );
};
