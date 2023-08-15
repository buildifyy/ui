import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

interface FooterProps {
  readonly onReset?: () => void;
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
  readonly setStepSelection: (
    val: "Basic Information" | "Attributes" | "Relationships" | "Metric Types",
  ) => void;
  readonly isReadonly?: boolean;
}

export const Footer = ({
  onReset,
  stepSelection,
  setStepSelection,
  isReadonly,
}: FooterProps) => {
  const handleOnCancel = () => {
    if (onReset) {
      onReset();
    }
  };

  const isBackButtonDisabled = stepSelection === "Basic Information";

  const isNextButtonDisabled = stepSelection === "Metric Types";

  const handleOnBackClick = () => {
    if (stepSelection === "Attributes") {
      setStepSelection("Basic Information");
    } else if (stepSelection === "Relationships") {
      setStepSelection("Attributes");
    } else if (stepSelection === "Metric Types") {
      setStepSelection("Relationships");
    }
  };

  const handleOnNextClick = () => {
    if (stepSelection === "Basic Information") {
      setStepSelection("Attributes");
    } else if (stepSelection === "Attributes") {
      setStepSelection("Relationships");
    } else if (stepSelection === "Relationships") {
      setStepSelection("Metric Types");
    }
  };

  return (
    <div className="fixed left-[244px] inset-x-0 bottom-0 grid h-[60px] pr-28 pl-14  items-center border-t grid-cols-[1fr,1fr,auto]">
      <div className="grid-item flex gap-4">
        <button
          disabled={isBackButtonDisabled}
          onClick={handleOnBackClick}
          className="text-indigo-600 disabled:text-gray-500 text-2xl"
        >
          <FaCircleArrowLeft />
        </button>
        <button
          disabled={isNextButtonDisabled}
          onClick={handleOnNextClick}
          className="text-indigo-600 disabled:text-gray-500 text-2xl"
        >
          <FaCircleArrowRight />
        </button>
      </div>
      <div className="grid-item"></div>
      {!isReadonly && (
        <div className="grid-item">
          <button
            className="inline-block rounded px-5 py-1 w-fit text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleOnCancel}
          >
            Cancel
          </button>
          <button
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-1 w-fit text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 ml-5 disabled:opacity-50 disabled:pointer-events-none"
            type="submit"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
