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
}

export const TemplateCreate = ({ stepSelection }: TemplateCreateProps) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);

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
        return <BasicInformation />;
      case "Attributes":
        return (
          <Attributes
            attributes={attributes}
            addAttribute={handleAddAttribute}
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
      {toRender()}
    </div>
  );
};
