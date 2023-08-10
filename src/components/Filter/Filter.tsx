import Select, {MultiValue, components, OptionProps, MultiValueProps} from "react-select"

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

export const Filter = ({options, selectedValues, setSelectedValues, placeholderText, isDisabled}: FilterProps) => {
  const InputOption = (props: OptionProps<FilterOption>) => {
    return (
      <components.Option
        {...props}
      >
        <input type="checkbox" checked={props.isSelected}/>
        <span className="ml-2">{props.children}</span>
      </components.Option>
    );
  };

  const MultiValue = (props: MultiValueProps<FilterOption>) => {
    return !props.index &&
        <components.SingleValue {...props}><span
            className="text-sm">{selectedValues?.length} selected</span>
        </components.SingleValue>
  }


  const handleOnSelect = (options: MultiValue<FilterOption>) => {
    if (Array.isArray(options)) {
      setSelectedValues(options.map(opt => opt.value))
    }
  }

  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      closeMenuOnScroll={false}
      hideSelectedOptions={false}
      onChange={handleOnSelect}
      options={options}
      components={{Option: InputOption, MultiValue}}
      placeholder={placeholderText}
      isDisabled={isDisabled}
    />
  );
}