import { useLocation, useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { Menu } from "@/components/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

export const Topbar = () => {
  const location = useLocation();
  const {
    formState: { errors },
  } = useFormContext<TemplateFormData>();
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");

  const handleStepClick = (val: string) => {
    switch (val) {
      case "basic-information":
      case "attributes":
      case "relationships":
      case "metrics":
        searchParams.set("config", val);
        setSearchParams(searchParams);
        break;
      default:
        break;
    }
  };

  const shouldDisplaySteps =
    location.pathname !== "/" &&
    location.pathname !== "/templates" &&
    location.pathname !== "/instances";

  return (
    <div className="flex items-center border-b">
      <Menu />
      {shouldDisplaySteps && (
        <div className="flex flex-grow justify-center">
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage={config === "basic-information"}>
              <BreadcrumbLink
                onClick={() => handleStepClick("basic-information")}
                className={`${
                  errors.basicInformation &&
                  Object.keys(errors.basicInformation).length > 0
                    ? "text-red-600"
                    : ""
                }`}
              >
                Basic Information
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={config === "attributes"}>
              <BreadcrumbLink
                onClick={() => handleStepClick("attributes")}
                className={`${
                  errors.attributes && Object.keys(errors.attributes).length > 0
                    ? "text-red-600"
                    : ""
                }`}
              >
                Attributes
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={config === "relationships"}>
              <BreadcrumbLink onClick={() => handleStepClick("relationships")}>
                Relationships
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage={config === "metrics"}>
              <BreadcrumbLink
                onClick={() => handleStepClick("metrics")}
                className={`${
                  errors.metrics && Object.keys(errors.metrics).length > 0
                    ? "text-red-600"
                    : ""
                }`}
              >
                Metrics
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      )}
    </div>
  );
};
