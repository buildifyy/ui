import { Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useInstanceCreateForm, useInstanceCreate } from "@/service";
import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useToast } from "@/components/ui/use-toast.ts";
import { Toaster } from "@/components/ui/toaster.tsx";
import { ToastAction } from "@/components/ui/toast";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { Metrics } from "./Metrics";
import { Relationships } from "./Relationships";

interface InstanceCreateProps {
  readonly setAttributeSchemaContext?: (
    metaData: InstanceMetaDataField[]
  ) => void;
  readonly setMetricSchemaContext?: (metaData: InstanceMetaDataField[]) => void;
}

export const InstanceCreate = ({
  setAttributeSchemaContext,
  setMetricSchemaContext,
}: InstanceCreateProps) => {
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
          metrics: [],
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
    metrics: "Metrics",
  };

  useEffect(() => {
    if (!config) {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    }
  }, [config, searchParams, setSearchParams]);

  useEffect(() => {
    if (
      instanceCreateFormData &&
      setAttributeSchemaContext &&
      setMetricSchemaContext
    ) {
      setAttributeSchemaContext(instanceCreateFormData.attributes.fields);
      setMetricSchemaContext(instanceCreateFormData.metrics.fields);
    }
  }, [
    instanceCreateFormData,
    setAttributeSchemaContext,
    setMetricSchemaContext,
  ]);

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
      case "relationships":
        return <Relationships />;
      case "metrics":
        return <Metrics fields={instanceCreateFormData?.metrics.fields} />;
      default:
        return null;
    }
  };

  const onSubmit: SubmitHandler<InstanceFormData> = (data) => {
    setExternalId(getValues("basicInformation.externalId"));
    const toPush: InstanceFormData = {
      ...data,
      relationships: data.relationships?.map((relationship) => {
        return {
          ...relationship,
          target: !(relationship.target as string).includes(",")
            ? [relationship.target as string]
            : (relationship.target as string).split(","),
        };
      }),
    };
    createInstance(toPush);
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
