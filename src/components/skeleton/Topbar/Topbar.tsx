import { useLocation, useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { BadgeAlert, Check } from "lucide-react";
import { Menu } from "@/components/skeleton/Menu";

export const Topbar = () => {
  const location = useLocation();
  const {
    formState: { errors, isValid, isSubmitted },
  } = useFormContext<TemplateFormData>();
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");

  const handleStepClick = (val: string) => {
    switch (val) {
      case "basic-information":
      case "attributes":
      case "relationships":
      case "metric-types":
        searchParams.set("config", val);
        setSearchParams(searchParams);
        break;
      default:
        break;
    }
  };

  const shouldDisplaySteps =
    location.pathname !== "/" && location.pathname !== "/templates";

  return (
    <div className="flex items-center border-b">
      <Menu />
      {shouldDisplaySteps && (
        <div className="flex flex-grow px-28 items-center">
          <h2 className="sr-only">Steps</h2>

          <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100 w-full">
            <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
              <li
                className="flex items-center gap-2 bg-white p-2"
                onClick={() => handleStepClick("basic-information")}
              >
                {errors.basicInformation?.parent ||
                errors.basicInformation?.name ||
                errors.basicInformation?.externalId ? (
                  <BadgeAlert
                    width={17}
                    height={17}
                    className="text-red-600 text-center"
                  />
                ) : isSubmitted && isValid ? (
                  <Check height={17} width={17} className="text-green-600" />
                ) : (
                  <span
                    className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold text-white ${
                      config === "basic-information"
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
                      config === "basic-information" ? "font-bold" : ""
                    }`}
                  >
                    Basic Information
                  </span>
                </div>
              </li>

              <li
                className="flex items-center gap-2 bg-white p-2"
                onClick={() => handleStepClick("attributes")}
              >
                {errors.attributes?.length && errors.attributes.length > 0 ? (
                  <BadgeAlert
                    width={17}
                    height={17}
                    className="text-red-600 text-center"
                  />
                ) : isSubmitted && isValid ? (
                  <Check height={17} width={17} className="text-green-600" />
                ) : (
                  <span
                    className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold text-white ${
                      config === "attributes" ? "bg-blue-600" : "bg-gray-100"
                    }`}
                  >
                    2
                  </span>
                )}

                <div className="flex gap-2 items-center">
                  <span
                    className={`hidden sm:block ${
                      config === "attributes" ? "font-bold" : ""
                    }`}
                  >
                    Attributes
                  </span>
                </div>
              </li>

              <li
                className="flex items-center gap-2 bg-white p-2"
                onClick={() => handleStepClick("relationships")}
              >
                <span
                  className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold text-white ${
                    config === "relationships" ? "bg-blue-600" : "bg-gray-100"
                  }`}
                >
                  3
                </span>

                <span
                  className={`hidden sm:block ${
                    config === "relationships" ? "font-bold" : ""
                  }`}
                >
                  {" "}
                  Relationships{" "}
                </span>
              </li>

              <li
                className="flex items-center gap-2 bg-white p-2"
                onClick={() => handleStepClick("metric-types")}
              >
                {errors.metricTypes?.length && errors.metricTypes.length > 0 ? (
                  <BadgeAlert
                    width={17}
                    height={17}
                    className="text-red-600 text-center"
                  />
                ) : isSubmitted && isValid ? (
                  <Check height={17} width={17} className="text-green-600" />
                ) : (
                  <span
                    className={`h-6 w-6 rounded-full text-center text-[10px]/6 font-bold text-white ${
                      config === "metric-types" ? "bg-blue-600" : "bg-gray-100"
                    }`}
                  >
                    4
                  </span>
                )}

                <span
                  className={`hidden sm:block ${
                    config === "metric-types" ? "font-bold" : ""
                  }`}
                >
                  {" "}
                  Metric Types{" "}
                </span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
