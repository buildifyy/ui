import { useState } from "react";
import { Header } from "../..";
import { BasicInformation } from "./BasicInformation";

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
  const [parent, setParent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [externalId, setExternalId] = useState<string>("");

  const handleParentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParent(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleExternalIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExternalId(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <div className="w-full">
      <Header value={stepSelection} />
      <form onSubmit={handleSubmit}>
        {stepSelection === "Basic Information" ? (
          <BasicInformation
            parent={parent}
            onChangeParent={handleParentChange}
            name={name}
            onChangeName={handleNameChange}
            externalId={externalId}
            onChangeExternalId={handleExternalIdChange}
          />
        ) : null}
      </form>
    </div>
  );
};
