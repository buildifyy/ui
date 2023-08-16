import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { MetricTypes } from "./MetricTypes";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTemplateCreate } from "@/service";

interface TemplateCreateProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
  readonly setStepSelection: (
    val: "Basic Information" | "Attributes" | "Relationships" | "Metric Types",
  ) => void;
  readonly setShowCancelPopup: (show: boolean) => void;
}

export const TemplateCreate = ({
  stepSelection,
  setStepSelection,
  setShowCancelPopup,
}: TemplateCreateProps) => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<TemplateFormData>();
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
      setStepSelection("Basic Information");
      showSuccessToast();
    }
  }, [isCreateTemplateSuccess]);

  console.log("errors: ", errors);

  const toRender = () => {
    switch (stepSelection) {
      case "Basic Information":
        return <BasicInformation />;
      case "Attributes":
        return <Attributes />;
      case "Metric Types":
        return <MetricTypes />;
      default:
        return null;
    }
  };

  const onSubmit: SubmitHandler<TemplateFormData> = (data) => {
    const toPush: TemplateFormData = {
      ...data,
      attributes: data.attributes.filter((a) => a.isNew).reverse(),
      metricTypes: data.metricTypes
        .filter((mt) => mt.isNew)
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

  const handleOnReset = () => {
    setShowCancelPopup(true);
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
        <div className="w-full">
          <Header value={stepSelection} />
          {toRender()}
          <Footer
            onReset={handleOnReset}
            stepSelection={stepSelection}
            setStepSelection={setStepSelection}
            isReadonly={false}
          />
        </div>
      </form>
    </>
  );
};
