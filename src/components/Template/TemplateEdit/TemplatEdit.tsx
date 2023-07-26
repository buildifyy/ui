import { useParams } from "react-router-dom";

interface TemplateEditProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
}

export const TemplateEdit = ({ stepSelection }: TemplateEditProps) => {
  const { templateId } = useParams();
  console.log("stepSelection: ", stepSelection);

  return <div>Template Edit: {templateId}</div>;
};
