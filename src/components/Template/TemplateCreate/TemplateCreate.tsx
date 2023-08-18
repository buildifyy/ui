import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { MetricTypes } from "./MetricTypes";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { Header, Popup } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect, useState } from "react";
import { useTemplateCreate } from "@/service";
import { useSearchParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster.tsx";
import { useToast } from "@/components/ui/use-toast.ts";

export const TemplateCreate = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useFormContext<TemplateFormData>();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");
  const { toast } = useToast();

  useEffect(() => {
    if (!config) {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    }
  }, [config]);

  const configMap: Record<string, string> = {
    "basic-information": "Basic Information",
    attributes: "Attributes",
    relationships: "Relationships",
    "metric-types": "Metric Types",
  };

  const showSuccessToast = () => {
    toast({
      variant: "destructive",
      title: "Template Created Successfully",
      className: "group border-none bg-blue-600 text-primary-foreground",
    });
  };

  const showFailureToast = () => {
    toast({
      variant: "destructive",
      title: "Template Creation Failed",
    });
  };

  const {
    mutate: createTemplate,
    isSuccess: isCreateTemplateSuccess,
    isError: isCreateTemplateError,
  } = useTemplateCreate();

  useEffect(() => {
    if (isCreateTemplateSuccess) {
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
  }, [isCreateTemplateSuccess]);

  useEffect(() => {
    if (isCreateTemplateError) {
      showFailureToast();
    }
  }, [isCreateTemplateError]);

  console.log("errors: ", errors);

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

  const onSubmit: SubmitHandler<TemplateFormData> = (data) => {
    const toPush: TemplateFormData = {
      ...data,
      attributes: data.attributes
        .filter((a) => a.isNew)
        .map((a) => {
          return {
            ...a,
            owningTemplate: getValues("basicInformation.externalId"),
          };
        })
        .reverse(),
      metricTypes: data.metricTypes
        .filter((mt) => mt.isNew)
        .map((mt) => {
          return {
            ...mt,
            owningTemplate: getValues("basicInformation.externalId"),
          };
        })
        .map((mt) => {
          return {
            ...mt,
            metrics: mt.metrics.reverse(),
          };
        })
        .reverse(),
    };
    createTemplate(toPush);
  };

  const handleConfirmReset = () => {
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
    setShowCancelPopup(false);
  };

  return (
    <>
      <Toaster />
      {showCancelPopup && (
        <Popup
          onReset={handleConfirmReset}
          onBack={() => setShowCancelPopup(false)}
          confirmationMessage="Are you sure you want to cancel the template creation process?"
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
        <div className="w-full">
          <Header value={config ? configMap[config] : "Basic Information"} />
          {toRender()}
          <Footer onReset={() => setShowCancelPopup(true)} />
        </div>
      </form>
    </>
  );
};
