import { useParams, useSearchParams } from "react-router-dom";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { useEffect, useState } from "react";
import { useTemplateEdit, useTemplateView } from "@/service";
import { BasicInformation } from "@/components/Template/TemplateCreate/BasicInformation";
import { Attributes } from "@/components/Template/TemplateCreate/Attributes";
import { MetricTypes } from "@/components/Template/TemplateCreate/MetricTypes";
import { Header, Popup } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { toast, ToastContainer } from "react-toastify";

export const TemplateEdit = () => {
  const { reset, getValues, handleSubmit } = useFormContext<TemplateFormData>();
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const { templateId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");

  useEffect(() => {
    if (!config) {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    }
  }, [config]);

  const { data, refetch: refetchTemplateData } = useTemplateView(templateId);

  const { mutate: updateTemplate, isSuccess: isUpdateTemplateSuccess } =
    useTemplateEdit();

  const showSuccessToast = () => {
    toast.success("Template updated successfully!", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
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
            metricTypes: data.metricTypes,
          };
        });
        searchParams.set("config", "basic-information");
        setSearchParams(searchParams);
        showSuccessToast();
        refetchTemplateData();
      }
    }
  }, [isUpdateTemplateSuccess]);

  const configMap: Record<string, string> = {
    "basic-information": "Basic Information",
    attributes: "Attributes",
    relationships: "Relationships",
    "metric-types": "Metric Types",
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
          metricTypes: data.metricTypes,
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
      metricTypes: data.metricTypes
        .map((mt) => {
          if (!mt.owningTemplate) {
            return {
              ...mt,
              owningTemplate: getValues("basicInformation.externalId"),
            };
          } else {
            return mt;
          }
        })
        .map((mt) => {
          return {
            ...mt,
            metrics: mt.metrics,
          };
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
      case "metric-types":
        return <MetricTypes />;
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
          metricTypes: data.metricTypes,
        };
      });
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
      setShowCancelPopup(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {showCancelPopup && (
        <Popup
          onReset={handleConfirmReset}
          onBack={() => setShowCancelPopup(false)}
          confirmationMessage="Are you sure you want to cancel the template edit process? All your recent changes will be reset"
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
