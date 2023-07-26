interface TemplateCreateProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
}

export const TemplateCreate = ({ stepSelection }: TemplateCreateProps) => {
  console.log("stepSelection: ", stepSelection);
  return <div>Template Create</div>;
};
