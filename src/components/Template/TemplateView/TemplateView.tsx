import { useParams } from "react-router-dom";

export const TemplateView = () => {
  const { templateId } = useParams();
  return <div>Template View: {templateId}</div>;
};
