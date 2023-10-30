import { Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "@/components/Instance/InstanceCreate/Attributes";
import { useInstanceCreateForm } from "@/service/instance";
import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useToast } from "@/components/ui/use-toast.ts";
import { Toaster } from "@/components/ui/toaster.tsx";

interface InstanceCreateProps {
  readonly setSchemaContext?: (metaData: InstanceMetaDataField[]) => void;
}

export const InstanceCreate = ({ setSchemaContext }: InstanceCreateProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<InstanceFormData>();
  const { toast } = useToast();

  const selectedParentLive = useWatch({
    control,
    name: "basicInformation.parent",
  });

  const {
    data: instanceCreateFormData,
    isFetching: isFetchingInstanceCreateFormData,
  } = useInstanceCreateForm(selectedParentLive);

  const configMap: Record<string, string> = {
    "basic-information": "Basic Information",
    attributes: "Attributes",
    relationships: "Relationships",
    "metric-types": "Metric Types",
  };

  useEffect(() => {
    if (!config) {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    }
  }, [config]);

  useEffect(() => {
    if (instanceCreateFormData && setSchemaContext) {
      setSchemaContext(instanceCreateFormData.attributes.fields);
    }
  }, [instanceCreateFormData]);

  const toRender = () => {
    switch (config) {
      case "basic-information":
        return (
          <BasicInformation
            fields={instanceCreateFormData?.basicInformation.fields}
            isLoading={isFetchingInstanceCreateFormData}
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

  const onSubmit: SubmitHandler<InstanceFormData> = (data) => {
    console.log("data: ", data);
    reset((prev) => {
      return {
        tenant: prev.tenant,
        basicInformation: {
          parent: "",
          name: "",
          externalId: "",
          isCustom: true,
        },
        attributes: [],
      };
    });
    searchParams.set("config", "basic-information");
    setSearchParams(searchParams);
    showSuccessToast();
  };

  const showSuccessToast = () => {
    toast({
      variant: "destructive",
      title: "Instance Created Successfully",
      className: "group border-none bg-blue-600 text-primary-foreground",
    });
  };

  console.log("errors: ", errors);

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
        <div className="w-full">
          <Header
            value={config ? configMap[config] : "Basic Information"}
            type="Instance"
          />
          {toRender()}
          <Footer />
        </div>
      </form>
    </>
  );
};
