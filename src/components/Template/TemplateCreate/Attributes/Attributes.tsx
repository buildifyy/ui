import { useFieldArray, useFormContext } from "react-hook-form";
import { AddPanel, Panel } from "../../..";
import { CreateTemplateFormData } from "../../../../models";

export const Attributes = () => {
  const { control } = useFormContext<CreateTemplateFormData>();
  const {
    fields: attributes,
    prepend,
    remove,
  } = useFieldArray({ control, name: "attributes", keyName: "_id" });

  const handleRemoveAttribute = (index: number) => {
    remove(index);
  };

  const handleAddAttribute = () => {
    prepend({ name: "", dataType: "", isRequired: false });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-scroll h-[30rem]">
      <div className="space-y-4 w-full">
        {attributes.length !== 0 ? (
          <span>
            {attributes.length} new
            {attributes.length > 1 ? " attributes" : " attribute"}
          </span>
        ) : null}

        <AddPanel onAdd={handleAddAttribute} />
        {attributes.map((attr, index) => {
          return (
            <Panel
              key={attr._id}
              index={index}
              onRemove={handleRemoveAttribute}
            />
          );
        })}
      </div>
    </div>
  );
};
