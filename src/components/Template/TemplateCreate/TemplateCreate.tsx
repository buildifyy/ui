interface TemplateCreateProps {
  readonly stepSelection:
    | "Basic Information"
    | "Attributes"
    | "Relationships"
    | "Metric Types";
  readonly tenant: string;
}

export const TemplateCreate = ({
  stepSelection,
  tenant,
}: TemplateCreateProps) => {
  console.log("stepSelection: ", stepSelection);
  console.log("tenant: ", tenant);

  return <div>Template Create</div>;
};
