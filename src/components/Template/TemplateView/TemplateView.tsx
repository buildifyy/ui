import { useParams } from "react-router-dom";

interface TemplateViewProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
}

export const TemplateView = ({ stepSelection }: TemplateViewProps) => {
  const { templateId } = useParams();
  console.log("stepSelection: ", stepSelection);
  return <div>Template View: {templateId}</div>;
};
