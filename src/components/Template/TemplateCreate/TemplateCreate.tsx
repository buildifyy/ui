import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { Metrics } from "./Metrics";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { Alert, Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect, useState } from "react";
import { useTemplateCreate } from "@/service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { ToastAction } from "@/components/ui/toast";

export const TemplateCreate = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useFormContext<TemplateFormData>();
  const [externalId, setExternalId] = useState<string>("");
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!config) {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    }
  }, [config, searchParams, setSearchParams]);

  const configMap: Record<string, string> = {
    "basic-information": "Basic Information",
    attributes: "Attributes",
    relationships: "Relationships",
    metrics: "Metrics",
  };

  const showSuccessToast = () => {
    toast({
      title: "Template Created Successfully",
      className: "group",
      action: (
        <ToastAction
          altText="View"
          onClick={() => navigate(`/templates/${externalId}`)}
        >
          View
        </ToastAction>
      ),
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
          metrics: [],
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
      case "metrics":
        return <Metrics />;
      default:
        return null;
    }
  };

  const onSubmit: SubmitHandler<TemplateFormData> = (data) => {
    setExternalId(getValues("basicInformation.externalId"));
    const toPush: TemplateFormData = {
      ...data,
      attributes: data.attributes
        .filter((a) => a.isNew)
        .map((a) => {
          return {
            ...a,
            owningTemplate: getValues("basicInformation.externalId"),
          };
        }),
      metrics: data.metrics
        .filter((mt) => mt.isNew)
        .map((mt) => {
          return {
            ...mt,
            owningTemplate: getValues("basicInformation.externalId"),
          };
        }),
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
        metrics: [],
      };
    });
    searchParams.set("config", "basic-information");
    setSearchParams(searchParams);
    setShowCancelPopup(false);
  };

  return (
    <>
      <Toaster />
      <Alert
        title="Cancel Template Creation Process ?"
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
