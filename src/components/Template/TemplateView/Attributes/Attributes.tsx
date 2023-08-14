import { useFieldArray, useFormContext } from "react-hook-form";
import { Dropdown, TemplateFormData } from "../../../../models";
import { AttributePanel } from "../../Panels";

interface AttributesProps {
  readonly dropdownValues?: Dropdown[];
}

export const Attributes = ({ dropdownValues }: AttributesProps) => {
  const { control } = useFormContext<TemplateFormData>();
  const { fields: attributes } = useFieldArray({
    control,
    name: "attributes",
    keyName: "_id",
  });

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[30rem]">
      <div className="space-y-4 w-full">
        {attributes.length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {attributes.length}
              {attributes.length > 1 ? " attributes" : " attribute"}
            </span>
          </div>
        ) : null}

        {attributes.length === 0 ? <span>No attributes found</span> : null}

        {attributes.map((attr, index) => {
          return (
            <AttributePanel
              key={attr._id}
              index={index}
              isReadonly
              dropdownValues={dropdownValues}
            />
          );
        })}
      </div>
    </div>
  );
};
