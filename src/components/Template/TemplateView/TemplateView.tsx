import { useParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { TemplateFormData } from "../../../models";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { MetricTypes } from "./MetricTypes";
import { Header } from "../../shared";
import { Footer } from "../../skeleton";
import { useEffect } from "react";

interface TemplateViewProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
}

export const TemplateView = ({ stepSelection }: TemplateViewProps) => {
  const { reset } = useFormContext<TemplateFormData>();
  const { templateId } = useParams();

  useEffect(() => {
    if (templateId) {
      const localData = localStorage.getItem("templates");
      const jsonData: TemplateFormData[] = localData
        ? JSON.parse(localData)
        : [];
      const currentTemplate = jsonData.find(
        (data) => data.basicInformation.externalId === templateId,
      );
      reset(currentTemplate);
    }
  }, [templateId]);

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
    <form className="h-full w-full">
      <div className="w-full">
        <Header value={stepSelection} />
        {toRender()}
        <Footer />
      </div>
    </form>
  );
};
