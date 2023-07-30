import { FaPlus } from "react-icons/fa";

interface AddPanelProps {
  readonly onAdd: () => void;
}

export const AddPanel = ({ onAdd }: AddPanelProps) => {
  return (
    <div
      className="flex rounded-lg p-3 border-dotted border-2 border-green-500 hover:bg-gray-50 hover:cursor-pointer items-center"
      onClick={onAdd}
    >
      <FaPlus className="text-gray-600" />
      <span className="ml-2 text-sm">Add Attribute</span>
    </div>
  );
};
