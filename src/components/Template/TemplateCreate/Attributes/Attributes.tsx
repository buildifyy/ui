import { useFieldArray, useFormContext } from "react-hook-form";
import { AddPanel, Panel } from "../../..";
import { CreateTemplateFormData } from "../../../../models";

export const Attributes = () => {
  const { control } = useFormContext<CreateTemplateFormData>();
  const {
    fields: attributes,
    append,
    remove,
  } = useFieldArray({ control, name: "attributes", keyName: "_id" });

  const handleRemoveAttribute = (index: number) => {
    remove(index);
  };

  const handleAddAttribute = () => {
    append({ name: "" });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-scroll h-[27rem]">
      <div className="space-y-4 w-full">
        {attributes.map((attr, index) => {
          return (
            <Panel
              key={attr._id}
              index={index}
              onRemove={handleRemoveAttribute}
            />
          );
        })}
        <AddPanel onAdd={handleAddAttribute} />
      </div>
    </div>
  );
};
