import { useParams } from "react-router-dom";

interface TemplateViewProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
  readonly tenant: string;
}

export const TemplateView = ({ stepSelection, tenant }: TemplateViewProps) => {
  const { templateId } = useParams();
  console.log("stepSelection: ", stepSelection);
  console.log("tenant: ", tenant);
  return <div>Template View: {templateId}</div>;
};
