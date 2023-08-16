import { useParams } from "react-router-dom";

export const TemplateEdit = () => {
  const { templateId } = useParams();
  return <div>Template Edit: {templateId}</div>;
};
