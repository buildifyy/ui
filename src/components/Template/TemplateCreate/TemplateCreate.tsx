import { Header } from "../..";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";

interface TemplateCreateProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
}

export const TemplateCreate = ({ stepSelection }: TemplateCreateProps) => {
  const toRender = () => {
    switch (stepSelection) {
      case "Basic Information":
        return <BasicInformation />;
      case "Attributes":
        return <Attributes />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <Header value={stepSelection} />
      {toRender()}
    </div>
  );
};
