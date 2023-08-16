import { useParams, useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { useEffect } from "react";
import { useTemplateView } from "@/service";
import { BasicInformation } from "@/components/Template/TemplateCreate/BasicInformation";
import { Attributes } from "@/components/Template/TemplateCreate/Attributes";
import { MetricTypes } from "@/components/Template/TemplateCreate/MetricTypes";
import { Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";

export const TemplateEdit = () => {
  const { reset } = useFormContext<TemplateFormData>();
  const { templateId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");

  useEffect(() => {
    if (!config) {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    }
  }, [config]);

  const { data } = useTemplateView(templateId);

  const configMap: Record<string, string> = {
    "basic-information": "Basic Information",
    attributes: "Attributes",
    relationships: "Relationships",
    "metric-types": "Metric Types",
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  const toRender = () => {
    switch (config) {
      case "basic-information":
        return <BasicInformation />;
      case "attributes":
        return <Attributes />;
      case "metric-types":
        return <MetricTypes />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <Header value={config ? configMap[config] : "Basic Information"} />
      {toRender()}
      <Footer />
    </div>
  );
};
