import { useSearchParams } from "react-router-dom";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";

interface FooterProps {
  readonly onReset?: () => void;
}

export const Footer = ({ onReset }: FooterProps) => {
  const {
    formState: { dirtyFields },
  } = useFormContext<TemplateFormData>();
  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onReset) {
      onReset();
    }
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");

  const isBackButtonDisabled = config === "basic-information";

  const isNextButtonDisabled = config === "metric-types";

  const handleOnBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (config === "attributes") {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    } else if (config === "relationships") {
      searchParams.set("config", "attributes");
      setSearchParams(searchParams);
    } else if (config === "metric-types") {
      searchParams.set("config", "relationships");
      setSearchParams(searchParams);
    }
  };

  const handleOnNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (config === "basic-information") {
      searchParams.set("config", "attributes");
      setSearchParams(searchParams);
    } else if (config === "attributes") {
      searchParams.set("config", "relationships");
      setSearchParams(searchParams);
    } else if (config === "relationships") {
      searchParams.set("config", "metric-types");
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 grid h-[60px] px-14  items-center border-t grid-cols-[1fr,1fr,auto]">
      <div className="grid-item flex gap-4">
        <button
          disabled={isBackButtonDisabled}
          onClick={handleOnBackClick}
          className="text-indigo-600 disabled:text-gray-500 text-2xl"
        >
          <ChevronLeftCircle height={25} width={25} />
        </button>
        <button
          disabled={isNextButtonDisabled}
          onClick={handleOnNextClick}
          className="text-indigo-600 disabled:text-gray-500 text-2xl"
        >
          <ChevronRightCircle height={25} width={25} />
        </button>
      </div>
      <div className="grid-item"></div>
      <div className="grid-item">
        <button
          className="inline-block rounded px-5 py-1 w-fit text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
          onClick={handleOnCancel}
          disabled={Object.keys(dirtyFields).length === 0}
        >
          Cancel
        </button>
        <button
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-1 w-fit text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 ml-5 disabled:opacity-50 disabled:pointer-events-none"
          type="submit"
          disabled={Object.keys(dirtyFields).length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};
