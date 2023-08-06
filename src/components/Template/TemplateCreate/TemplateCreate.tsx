import { Footer, Header } from "../..";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { MetricTypes } from "./MetricTypes";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { CreateTemplateFormData } from "../../../models";

interface TemplateCreateProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
}

export const TemplateCreate = ({ stepSelection }: TemplateCreateProps) => {
  const { handleSubmit } = useFormContext<CreateTemplateFormData>();
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

  const onSubmit: SubmitHandler<CreateTemplateFormData> = (data) =>
    console.log("createTemplateFormData: ", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
      <div className="w-full">
        <Header value={stepSelection} />
        {toRender()}
        <Footer />
      </div>
    </form>
  );
};
