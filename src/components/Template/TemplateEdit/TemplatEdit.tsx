import { useParams } from "react-router-dom";

interface TemplateEditProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
  readonly tenant: string;
}

export const TemplateEdit = ({ stepSelection, tenant }: TemplateEditProps) => {
  const { templateId } = useParams();
  console.log("stepSelection: ", stepSelection);
  console.log("tenant: ", tenant);

  return <div>Template Edit: {templateId}</div>;
};
