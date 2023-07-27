import { useEffect, useState } from "react";
import { Header } from "../..";
import { BasicInformation } from "./BasicInformation";
import { Attributes } from "./Attributes";
import { Attribute } from "../../../models";

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
  const [parent, setParent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [externalId, setExternalId] = useState<string>("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);

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

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submittedData: ", {
      parent,
      name,
      externalId,
      custom: true,
      tenant: tenant,
    });
  };

  const handleAddAttribute = (newAttribute: Attribute) => {
    setAttributes((attributes) => {
      const newAttributes = attributes.map((attr) => {
        if (attr.isOpen) {
          return {
            ...attr,
            isOpen: false,
          };
        }
        return attr;
      });
      newAttributes.push(newAttribute);
      return newAttributes;
    });
  };

  const handleOpenAttribute = (id: string) => {
    setAttributes((attributes) => {
      return attributes.map((attribute) => {
        if (attribute.id === id) {
          return {
            ...attribute,
            isOpen: !attribute.isOpen,
          };
        }
        return attribute;
      });
    });
  };

  const handleRemoveAttribute = (id: string) => {
    console.log("attributes: ", attributes);
    setAttributes((attr) => attr.filter((a: Attribute) => a.id !== id));
  };

  useEffect(() => {
    console.log("current attributes: ", attributes);
  }, [attributes]);

  const toRender = () => {
    switch (stepSelection) {
      case "Basic Information":
        return (
          <BasicInformation
            parent={parent}
            onChangeParent={handleParentChange}
            name={name}
            onChangeName={handleNameChange}
            externalId={externalId}
            onChangeExternalId={handleExternalIdChange}
          />
        );
      case "Attributes":
        return (
          <Attributes
            attributes={attributes}
            addAttribute={handleAddAttribute}
            openAttribute={handleOpenAttribute}
            removeAttribute={handleRemoveAttribute}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <Header value={stepSelection} />
      <form id="template-form" onSubmit={handleOnSubmit}>
        {toRender()}
      </form>
    </div>
  );
};
