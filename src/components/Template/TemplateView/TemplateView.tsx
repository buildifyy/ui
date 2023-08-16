import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { MetricTypes } from "./MetricTypes";
import { Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect } from "react";
import { useTemplateView } from "@/service";

interface TemplateViewProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
  readonly setStepSelection: (
    val: "Basic Information" | "Attributes" | "Relationships" | "Metric Types",
  ) => void;
}

export const TemplateView = ({
  stepSelection,
  setStepSelection,
}: TemplateViewProps) => {
  const { reset } = useFormContext<TemplateFormData>();
  const { templateId } = useParams();

  const { data } = useTemplateView(templateId);

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

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

  return (
    <div className="w-full">
      <Header value={stepSelection} />
      {toRender()}
      <Footer
        stepSelection={stepSelection}
        setStepSelection={setStepSelection}
        isReadonly
      />
    </div>
  );
};
