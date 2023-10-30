import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { AddPanel } from "@/components/shared";
import { AttributePanel } from "../../Panels";
import { useAttributeTypeDropdown } from "@/service/common";
import { useLocation } from "react-router-dom";

export const Attributes = () => {
  const location = useLocation();
  const { control, getValues } = useFormContext<TemplateFormData>();
  const {
    fields: attributes,
    append,
    prepend,
    remove,
  } = useFieldArray({ control, name: "attributes", keyName: "_id" });

  const isEditMode = location.pathname.includes("/edit");

  const { data: attributeTypeValues } = useAttributeTypeDropdown();

  const handleRemoveAttribute = (index: number) => {
    remove(index);
  };

  const handleAddAttribute = () => {
    if (isEditMode) {
      append({
        name: "",
        dataType: "",
        isNew: true,
        isRequired: false,
        isHidden: false,
      });
    } else {
      prepend({
        name: "",
        dataType: "",
        isNew: true,
        isRequired: false,
        isHidden: false,
      });
    }
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)]">
      <div className="space-y-4 w-full overflow-y-auto">
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
      </div>
    </div>
  );
};
