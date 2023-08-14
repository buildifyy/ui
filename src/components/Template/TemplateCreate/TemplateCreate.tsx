import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { MetricTypes } from "./MetricTypes";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { TemplateFormData } from "../../../models";
import { Header } from "../../shared";
import { Footer } from "../../skeleton";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTemplateCreate } from "../../../service/template/use-template-create.tsx";
import {
  useAttributeTypeDropdown,
  useMetricTypeDropdown,
} from "../../../service/common";
import { useParentTemplates } from "../../../service";

interface TemplateCreateProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
  readonly setStepSelection: (
    val: "Basic Information" | "Attributes" | "Relationships" | "Metric Types",
  ) => void;
}

export const TemplateCreate = ({
  stepSelection,
  setStepSelection,
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

  const { data: parentTemplates } = useParentTemplates();
  const { data: attributeTypeValues } = useAttributeTypeDropdown();
  const { data: metricTypeValues } = useMetricTypeDropdown();

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
        return <BasicInformation dropdownValues={parentTemplates} />;
      case "Attributes":
        return <Attributes dropdownValues={attributeTypeValues} />;
      case "Metric Types":
        return <MetricTypes dropdownValues={metricTypeValues} />;
      default:
        return null;
    }
  };

  const onSubmit: SubmitHandler<TemplateFormData> = (data) => {
    console.log("createTemplateFormData: ", data);
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

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
        <div className="w-full">
          <Header value={stepSelection} />
          {toRender()}
          <Footer />
        </div>
      </form>
    </>
  );
};
