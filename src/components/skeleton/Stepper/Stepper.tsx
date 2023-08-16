import { useLocation } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

interface StepperProps {
  readonly stepSelection: string;
  readonly setStepSelection: (
    val: "Basic Information" | "Attributes" | "Relationships" | "Metric Types",
  ) => void;
}

export const Stepper = ({ stepSelection, setStepSelection }: StepperProps) => {
  const location = useLocation();
  const {
    formState: { errors, isValid, isSubmitted },
  } = useFormContext<TemplateFormData>();

  const handleStepClick = (
    val: "Basic Information" | "Attributes" | "Relationships" | "Metric Types",
  ) => {
    if (stepSelection !== val) {
      setStepSelection(val);
    }
  };

  if (location.pathname === "/" || location.pathname === "/templates") {
    return null;
  }

  return (
    <div className="flex h-[60px] px-28 items-center border-b">
      <h2 className="sr-only">Steps</h2>

      <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100 w-full">
        <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
          <li
            className="flex items-center gap-2 bg-white p-2"
            onClick={() => handleStepClick("Basic Information")}
          >
            {errors.basicInformation?.parent ||
            errors.basicInformation?.name ||
            errors.basicInformation?.externalId ? (
              <FaExclamationTriangle className="text-red-600 text-center" />
            ) : isSubmitted && isValid ? (
              <FaCheck className="text-green-600" />
            ) : (
              <span
                className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold text-white ${
                  stepSelection === "Basic Information"
                    ? "bg-blue-600"
                    : "bg-gray-100"
                }`}
              >
                1
              </span>
            )}

            <div className="flex gap-2 items-center">
              <span
                className={`hidden sm:block ${
                  stepSelection === "Basic Information" ? "font-bold" : ""
                }`}
              >
                Basic Information
              </span>
            </div>
          </li>

          <li
            className="flex items-center gap-2 bg-white p-2"
            onClick={() => handleStepClick("Attributes")}
          >
            {errors.attributes?.length && errors.attributes.length > 0 ? (
              <FaExclamationTriangle className="text-red-600" />
            ) : isSubmitted && isValid ? (
              <FaCheck className="text-green-600" />
            ) : (
              <span
                className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold text-white ${
                  stepSelection === "Attributes" ? "bg-blue-600" : "bg-gray-100"
                }`}
              >
                2
              </span>
            )}

            <div className="flex gap-2 items-center">
              <span
                className={`hidden sm:block ${
                  stepSelection === "Attributes" ? "font-bold" : ""
                }`}
              >
                Attributes
              </span>
            </div>
          </li>

          <li
            className="flex items-center gap-2 bg-white p-2"
            onClick={() => handleStepClick("Relationships")}
          >
            <span
              className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold text-white ${
                stepSelection === "Relationships"
                  ? "bg-blue-600"
                  : "bg-gray-100"
              }`}
            >
              3
            </span>

            <span
              className={`hidden sm:block ${
                stepSelection === "Relationships" ? "font-bold" : ""
              }`}
            >
              {" "}
              Relationships{" "}
            </span>
          </li>

          <li
            className="flex items-center gap-2 bg-white p-2"
            onClick={() => handleStepClick("Metric Types")}
          >
            {errors.metricTypes?.length && errors.metricTypes.length > 0 ? (
              <FaExclamationTriangle className="text-red-600" />
            ) : isSubmitted && isValid ? (
              <FaCheck className="text-green-600" />
            ) : (
              <span
                className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold text-white ${
                  stepSelection === "Metric Types"
                    ? "bg-blue-600"
                    : "bg-gray-100"
                }`}
              >
                4
              </span>
            )}

            <span
              className={`hidden sm:block ${
                stepSelection === "Metric Types" ? "font-bold" : ""
              }`}
            >
              {" "}
              Metric Types{" "}
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};
