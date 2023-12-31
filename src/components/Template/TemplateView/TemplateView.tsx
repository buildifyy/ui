import { useParams, useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { Metrics } from "./Metrics";
import { Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect } from "react";
import { useTemplateView } from "@/service";

export const TemplateView = () => {
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
    metrics: "Metrics",
  };

  useEffect(() => {
    if (data) {
      reset((prev) => {
        return {
          tenant: prev.tenant,
          basicInformation: {
            ...data.basicInformation,
          },
          attributes: data.attributes,
          metrics: data.metrics,
        };
      });
    }
  }, [data, reset]);

  const toRender = () => {
    switch (config) {
      case "basic-information":
        return <BasicInformation />;
      case "attributes":
        return <Attributes />;
      case "metrics":
        return <Metrics />;
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
