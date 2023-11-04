import { useParams, useSearchParams } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { InstanceFormData } from "@/models";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect } from "react";
import { useInstanceCreateForm, useInstanceView } from "@/service";

export const InstanceView = () => {
  const { reset } = useFormContext<InstanceFormData>();
  const { instanceId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");

  useEffect(() => {
    if (!config) {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    }
  }, [config, searchParams, setSearchParams]);

  const { data: instanceData, isFetching: isFetchingInstanceData } =
    useInstanceView(instanceId);
  const { data: instanceCreateFormData, isFetching: isFetchingCreateFormData } =
    useInstanceCreateForm(instanceData?.basicInformation?.parent);

  const configMap: Record<string, string> = {
    "basic-information": "Basic Information",
    attributes: "Attributes",
    relationships: "Relationships",
    "metric-types": "Metric Types",
  };

  useEffect(() => {
    if (instanceData) {
      reset((prev) => {
        return {
          tenant: prev.tenant,
          basicInformation: {
            ...instanceData.basicInformation,
          },
          attributes: instanceData.attributes,
        };
      });
    }
  }, [instanceData, reset]);

  const toRender = () => {
    switch (config) {
      case "basic-information":
        return (
          <BasicInformation
            fields={instanceCreateFormData?.basicInformation.fields}
            isLoading={isFetchingCreateFormData || isFetchingInstanceData}
          />
        );
      case "attributes":
        return (
          <Attributes fields={instanceCreateFormData?.attributes.fields} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <Header
        value={config ? configMap[config] : "Basic Information"}
        type="Instance"
      />
      {toRender()}
      <Footer />
    </div>
  );
};
