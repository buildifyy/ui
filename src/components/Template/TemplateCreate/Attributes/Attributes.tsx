import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { AddPanel } from "@/components/shared";
import { AttributePanel } from "../../Panels";
import { useAttributeTypeDropdown } from "@/service/common";

export const Attributes = () => {
  const { control } = useFormContext<TemplateFormData>();
  const {
    fields: attributes,
    prepend,
    remove,
  } = useFieldArray({ control, name: "attributes", keyName: "_id" });

  const { data: attributeTypeValues } = useAttributeTypeDropdown();

  const handleRemoveAttribute = (index: number) => {
    remove(index);
  };

  const handleAddAttribute = () => {
    prepend({
      name: "",
      dataType: "",
      isNew: true,
      isRequired: false,
      isHidden: false,
    });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[28rem]">
      <div className="space-y-4 w-full">
        {attributes.filter((a) => a.isNew).length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {attributes.filter((a) => a.isNew).length} custom
              {attributes.filter((a) => a.isNew).length > 1
                ? " attributes"
                : " attribute"}
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
              dropdownValues={attributeTypeValues}
              isNew={attr.isNew}
            />
          );
        })}
      </div>
    </div>
  );
};
