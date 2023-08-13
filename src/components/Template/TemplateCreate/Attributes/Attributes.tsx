import { useFieldArray, useFormContext } from "react-hook-form";
import { Dropdown, TemplateFormData } from "../../../../models";
import { AddPanel } from "../../../shared";
import { AttributePanel } from "../../Panels";
import { useEffect, useState } from "react";

interface AttributesProps {
  readonly dropdownValues?: Dropdown[];
}

export const Attributes = ({ dropdownValues }: AttributesProps) => {
  const [attributeExpansionState, setAttributeExpansionState] =
    useState<Record<number, boolean>>();
  const { control } = useFormContext<TemplateFormData>();
  const {
    fields: attributes,
    prepend,
    remove,
  } = useFieldArray({ control, name: "attributes", keyName: "_id" });

  const handleRemoveAttribute = (index: number) => {
    remove(index);
  };

  const handleAddAttribute = () => {
    prepend({ name: "", dataType: "", isExpanded: true });
  };

  useEffect(() => {
    if (attributes) {
      if (attributes.length === 1) {
        setAttributeExpansionState({ [0]: true });
      } else {
        attributes.map((_, index) =>
          setAttributeExpansionState((prev) => {
            return {
              ...prev,
              [index]: false,
            };
          }),
        );
      }
    }
  }, [attributes]);

  const handleToggleExpandAttribute = (index: number) => {
    const newState = { ...attributeExpansionState };
    newState[index] = !newState[index];
    setAttributeExpansionState(newState);
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[30rem]">
      <div className="space-y-4 w-full">
        {attributes.length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {attributes.length} new
              {attributes.length > 1 ? " attributes" : " attribute"}
            </span>
          </div>
        ) : null}

        <AddPanel title="Add Attribute" onAdd={handleAddAttribute} />
        {attributes.map((attr, index) => {
          return (
            <AttributePanel
              key={attr._id}
              index={index}
              onRemove={handleRemoveAttribute}
              onToggleExpand={handleToggleExpandAttribute}
              dropdownValues={dropdownValues}
              expansionState={attributeExpansionState}
            />
          );
        })}
      </div>
    </div>
  );
};
