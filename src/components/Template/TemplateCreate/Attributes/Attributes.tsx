import { useFieldArray, useFormContext } from "react-hook-form";
import { CreateTemplateFormData } from "../../../../models";
import { useEffect } from "react";
import { AddPanel } from "../../../shared";
import { AttributePanel } from "../../Panels";

export const Attributes = () => {
  const { control, getValues } = useFormContext<CreateTemplateFormData>();
  const {
    fields: attributes,
    prepend,
    remove,
    update,
  } = useFieldArray({ control, name: "attributes", keyName: "_id" });

  const handleRemoveAttribute = (index: number) => {
    remove(index);
  };

  useEffect(() => {}, [attributes]);

  const handleAddAttribute = () => {
    prepend({ name: "", dataType: "", isExpanded: true });
  };

  const handleToggleExpandAttribute = (index: number) => {
    update(index, {
      ...getValues(`attributes.${index}`),
      isExpanded: !getValues(`attributes.${index}.isExpanded`),
    });
  };

  const handleToggleExpandOrCollapseAll = () => {
    const shouldCollapseAll = attributes.some((attr) => attr.isExpanded);
    if (shouldCollapseAll) {
      attributes.forEach((_, index) => {
        update(index, {
          ...getValues(`attributes.${index}`),
          isExpanded: false,
        });
      });
    } else {
      attributes.forEach((_, index) => {
        update(index, {
          ...getValues(`attributes.${index}`),
          isExpanded: true,
        });
      });
    }
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[35rem]">
      <div className="space-y-4 w-full">
        {attributes.length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {attributes.length} new
              {attributes.length > 1 ? " attributes" : " attribute"}
            </span>
            <button
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-1 w-fit text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
              type="submit"
              onClick={handleToggleExpandOrCollapseAll}
            >
              {attributes.some((attr) => attr.isExpanded)
                ? "Collapse All"
                : "Expand All"}
            </button>
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
            />
          );
        })}
      </div>
    </div>
  );
};
