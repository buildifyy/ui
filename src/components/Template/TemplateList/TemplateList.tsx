interface TemplateListProps {
  readonly tenant: string;
}

export const TemplateList = ({ tenant }: TemplateListProps) => {
  console.log("tenant: ", tenant);
  return <div>Template List</div>;
};
