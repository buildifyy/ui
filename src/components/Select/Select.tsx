import "./Select.css";

interface SelectProps {
  readonly name: string;
  readonly id: string;
  readonly onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  readonly value: string;
  readonly widthClassName?: string;
}

export const Select = ({
  name,
  id,
  onChange,
  value,
  widthClassName = "w-full",
}: SelectProps) => {
  return (
    <select
      name={name}
      id={id}
      className={`-ml-[2px] mt-1.5 ${widthClassName} rounded-lg border-gray-300 text-gray-700 py-2 px-2 border text-xs`}
      onChange={onChange}
      value={value}
      required
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
};
