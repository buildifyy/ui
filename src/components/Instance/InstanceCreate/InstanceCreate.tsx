import { Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "@/components/Instance/InstanceCreate/Attributes";
import { useInstanceCreateForm, useInstanceCreate } from "@/service";
import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useToast } from "@/components/ui/use-toast.ts";
import { Toaster } from "@/components/ui/toaster.tsx";
import { ToastAction } from "@/components/ui/toast";
import { MetricTypes } from "./MetricTypes";

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
    getValues,
    formState: { errors },
  } = useFormContext<InstanceFormData>();
  const [externalId, setExternalId] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const selectedParentLive = useWatch({
    control,
    name: "basicInformation.parent",
  });

  const {
    data: instanceCreateFormData,
    isFetching: isFetchingInstanceCreateFormData,
  } = useInstanceCreateForm(selectedParentLive);

  const {
    mutate: createInstance,
    isSuccess: isCreateInstanceSuccess,
    isError: isCreateInstanceError,
  } = useInstanceCreate();

  const showSuccessToast = () => {
    toast({
      title: "Instance Created Successfully",
      className: "group",
      action: (
        <ToastAction
          altText="View"
          onClick={() => navigate(`/instances/${externalId}`)}
        >
          View
        </ToastAction>
      ),
    });
  };

  const showFailureToast = () => {
    toast({
      variant: "destructive",
      title: "Instance Creation Failed",
    });
  };

  useEffect(() => {
    if (isCreateInstanceSuccess) {
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
          metricTypes: [],
        };
      });
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
      showSuccessToast();
    }
  }, [isCreateInstanceSuccess]);

  useEffect(() => {
    if (isCreateInstanceError) {
      showFailureToast();
    }
  }, [isCreateInstanceError]);

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
  }, [config, searchParams, setSearchParams]);

  useEffect(() => {
    if (instanceCreateFormData && setSchemaContext) {
      setSchemaContext(instanceCreateFormData.attributes.fields);
    }
  }, [instanceCreateFormData, setSchemaContext]);

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
      case "metric-types":
        return (
          <MetricTypes fields={instanceCreateFormData?.metricTypes.fields} />
        );
      default:
        return null;
    }
  };

  const onSubmit: SubmitHandler<InstanceFormData> = (data) => {
    setExternalId(getValues("basicInformation.externalId"));
    createInstance(data);
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
