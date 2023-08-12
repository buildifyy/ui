import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { MetricTypes } from "./MetricTypes";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { TemplateFormData } from "../../../models";
import { Header } from "../../shared";
import { Footer } from "../../skeleton";
import { useEffect } from "react";

interface TemplateCreateProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
  readonly setStepSelection: (
    val: "Basic Information" | "Attributes" | "Relationships" | "Metric Types",
  ) => void;
}

export const TemplateCreate = ({
  stepSelection,
  setStepSelection,
}: TemplateCreateProps) => {
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext<TemplateFormData>();
  useEffect(() => {
    reset();
    setStepSelection("Basic Information");
  }, [isSubmitSuccessful]);

  console.log("errors: ", errors);
  const toRender = () => {
    switch (stepSelection) {
      case "Basic Information":
        return <BasicInformation />;
      case "Attributes":
        return <Attributes />;
      case "Metric Types":
        return <MetricTypes />;
      default:
        return null;
    }
  };

  const onSubmit: SubmitHandler<TemplateFormData> = (data) => {
    console.log("createTemplateFormData: ", data);
    const localData = localStorage.getItem("templates");
    const jsonData: TemplateFormData[] = localData ? JSON.parse(localData) : [];
    const toPush: TemplateFormData = {
      ...data,
      attributes: data.attributes.map((a) => {
        return {
          ...a,
          isExpanded: false,
        };
      }),
      metricTypes: data.metricTypes.map((mt) => {
        return {
          ...mt,
          isExpanded: false,
          metrics: mt.metrics.map((m) => {
            return {
              ...m,
              isExpanded: false,
            };
          }),
        };
      }),
    };
    jsonData.push(toPush);
    localStorage.setItem("templates", JSON.stringify(jsonData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
      <div className="w-full">
        <Header value={stepSelection} />
        {toRender()}
        <Footer />
      </div>
    </form>
  );
};
