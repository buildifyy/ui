import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "../../../../models";
import { AttributePanel } from "../../Panels";

export const Attributes = () => {
  const { control, getValues } = useFormContext<TemplateFormData>();
  const { fields: attributes, update } = useFieldArray({
    control,
    name: "attributes",
    keyName: "_id",
  });

  const handleToggleExpandAttribute = (index: number) => {
    update(index, {
      ...getValues(`attributes.${index}`),
      isExpanded: !getValues(`attributes.${index}.isExpanded`),
    });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[35rem]">
      <div className="space-y-4 w-full">
        {attributes.length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {attributes.length}
              {attributes.length > 1 ? " attributes" : " attribute"}
            </span>
          </div>
        ) : null}

        {attributes.map((attr, index) => {
          return (
            <AttributePanel
              key={attr._id}
              index={index}
              onToggleExpand={handleToggleExpandAttribute}
              isReadonly
            />
          );
        })}
      </div>
    </div>
  );
};
