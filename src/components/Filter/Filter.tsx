import {useState} from "react";
import Select, {MultiValue, components, OptionProps, MultiValueProps} from "react-select"

export interface FilterOption {
  readonly label: string;
  readonly value: string;
}

interface FilterProps {
  readonly options: FilterOption[];
}

export const Filter = ({options}: FilterProps) => {
  const [selectedExternalIdValues, setSelectedExternalIdValues] = useState<FilterOption[]>([]);

  const InputOption = (props: OptionProps<FilterOption>) => {
    console.log('option props: ', props);
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
        <components.SingleValue {...props}><span>{selectedExternalIdValues.length} selected</span>
        </components.SingleValue>
  }

  const handleOnSelect = (options: MultiValue<FilterOption>) => {
    if (Array.isArray(options)) {
      setSelectedExternalIdValues(options.map(opt => opt.value))
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
      className="w-[18%]"
      placeholder="All External IDs"
    />
  );
}