import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { MetricTypes } from "./MetricTypes";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { Header, Popup } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTemplateCreate } from "@/service";
import { useSearchParams } from "react-router-dom";

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
    toast.success("Template created successfully!", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  };

  const { mutate: createTemplate, isSuccess: isCreateTemplateSuccess } =
    useTemplateCreate();

  useEffect(() => {
    if (isCreateTemplateSuccess) {
      reset();
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
      showSuccessToast();
    }
  }, [isCreateTemplateSuccess]);

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
    reset({
      basicInformation: {
        name: "",
        parent: "",
        externalId: "",
      },
      attributes: [],
      metricTypes: [],
    });
    searchParams.set("config", "basic-information");
    setSearchParams(searchParams);
    setShowCancelPopup(false);
  };

  return (
    <>
      <ToastContainer />
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
