interface AddPanelProps {
  readonly onAdd: () => void;
}

export const AddPanel = ({ onAdd }: AddPanelProps) => {
  return (
    <div
      className="rounded-lg p-3 border-dotted border-2 border-green-500 hover:bg-gray-50 hover:cursor-pointer"
      onClick={onAdd}
    >
      <span className="relative h-5 w-5 shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <span className="ml-10 text-sm">Add Attribute</span>
    </div>
  );
};
