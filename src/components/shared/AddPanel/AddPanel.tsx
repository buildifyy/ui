import { FaPlus } from "react-icons/fa";

interface AddPanelProps {
  readonly title: string;
  readonly onAdd: () => void;
  readonly className?: string;
}

export const AddPanel = ({ title, onAdd, className }: AddPanelProps) => {
  return (
    <div
      className={`flex rounded-lg p-3 border-dotted border-2 border-green-500 hover:bg-gray-50 hover:cursor-pointer items-center ${className}`}
      onClick={onAdd}
    >
      <FaPlus className="text-gray-600" />
      <span className="ml-2 text-sm">{title}</span>
    </div>
  );
};
