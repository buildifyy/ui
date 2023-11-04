import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { AddPanel } from "@/components/shared";
import { AttributePanel } from "@/components/Template";
import { useAttributeTypeDropdown } from "@/service";

export const Attributes = () => {
  const { control, getValues } = useFormContext<TemplateFormData>();
  const {
    fields: attributes,
    append,
    remove,
  } = useFieldArray({ control, name: "attributes", keyName: "_id" });

  const { data: attributeTypeValues } = useAttributeTypeDropdown();

  const handleRemoveAttribute = (index: number) => {
    remove(index);
  };

  const handleAddAttribute = () => {
    append({
      name: "",
      dataType: "",
      isNew: true,
      isRequired: false,
      isHidden: false,
    });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
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
              isReadonly={
                !attr.isNew &&
                attr.owningTemplate !== getValues("basicInformation.externalId")
              }
            />
          );
        })}
        <AddPanel title="Add Attribute" onAdd={handleAddAttribute} />
      </div>
    </div>
  );
};
