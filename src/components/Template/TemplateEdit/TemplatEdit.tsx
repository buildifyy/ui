import { useParams, useSearchParams } from "react-router-dom";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { useEffect, useState } from "react";
import { useTemplateEdit, useTemplateView } from "@/service";
import { BasicInformation } from "@/components/Template/TemplateCreate/BasicInformation";
import { Attributes } from "@/components/Template/TemplateCreate/Attributes";
import { Metrics } from "@/components/Template/TemplateCreate/Metrics";
import { Alert, Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useToast } from "@/components/ui/use-toast.ts";
import { Toaster } from "@/components/ui/toaster.tsx";

export const TemplateEdit = () => {
  const { reset, getValues, handleSubmit } = useFormContext<TemplateFormData>();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const { templateId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");
  const { toast } = useToast();

  useEffect(() => {
    if (!config) {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    }
  }, [config]);

  const { data, refetch: refetchTemplateData } = useTemplateView(templateId);

  const {
    mutate: updateTemplate,
    isSuccess: isUpdateTemplateSuccess,
    isError: isUpdateTemplateError,
  } = useTemplateEdit();

  const showSuccessToast = () => {
    toast({
      className: "group",
      title: "Template Updated Successfully",
    });
  };

  const showFailureToast = () => {
    toast({
      variant: "destructive",
      title: "Template Update Failed",
    });
  };

  useEffect(() => {
    if (isUpdateTemplateSuccess) {
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
        searchParams.set("config", "basic-information");
        setSearchParams(searchParams);
        showSuccessToast();
        refetchTemplateData();
      }
    }
  }, [isUpdateTemplateSuccess]);

  useEffect(() => {
    if (isUpdateTemplateError) {
      showFailureToast();
    }
  }, [isUpdateTemplateError]);

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
  }, [data]);

  const onSubmit: SubmitHandler<TemplateFormData> = (data) => {
    const toPush: TemplateFormData = {
      ...data,
      attributes: data.attributes.map((a) => {
        if (!a.owningTemplate) {
          return {
            ...a,
            owningTemplate: getValues("basicInformation.externalId"),
          };
        } else {
          return a;
        }
      }),
      metrics: data.metrics.map((metric) => {
        if (!metric.owningTemplate) {
          return {
            ...metric,
            owningTemplate: getValues("basicInformation.externalId"),
          };
        } else {
          return metric;
        }
      }),
    };
    updateTemplate(toPush);
  };

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

  const handleConfirmReset = () => {
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
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
      setShowCancelPopup(false);
    }
  };

  return (
    <>
      <Toaster />
      <Alert
        title="Cancel Template Update Process ?"
        isOpen={showCancelPopup}
        setIsOpen={setShowCancelPopup}
        onReset={handleConfirmReset}
        onCancel={() => setShowCancelPopup(false)}
      />
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
