import { useFormContext } from "react-hook-form";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/shared";
import { FormLabel } from "@/components/ui/form";

interface AttributesProps {
  readonly fields?: InstanceMetaDataField[];
}

export const Attributes = ({ fields }: AttributesProps) => {
  const { register, setValue } = useFormContext<InstanceFormData>();

  useEffect(() => {
    if (fields) {
      fields.forEach((field, index) => {
        register(`attributes.${index}.id`);
        setValue(`attributes.${index}.id`, field.id);
      });
    }
  }, [fields, register, setValue]);

  const boxToRender = (field: InstanceMetaDataField, index: number) => {
    switch (field.type) {
      case "string":
        return (
          <Input
            id={`attribute.${index}.${field.label}`}
            type="text"
            className="border p-2 rounded shadow-sm"
            placeholder={`${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
            disabled
          />
        );
      case "integer":
        return (
          <Input
            id={`attribute.${index}.${field.label}`}
            type="number"
            className="border p-2 rounded shadow-sm"
            placeholder={`${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
            disabled
          />
        );
      case "float":
        return (
          <Input
            id={`attribute.${index}.${field.label}`}
            type="text"
            className="border p-2 rounded shadow-sm"
            placeholder={`${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
            disabled
          />
        );
      case "bool":
        return (
          <Select
            id="parent"
            data={[
              { label: "True", value: "true" },
              { label: "False", value: "false" },
            ]}
            {...register(`attributes.${index}.value`)}
            isDisabled
          />
        );
    }
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <div className="space-y-4 w-full">
        {fields?.map((field, index) => {
          return (
            <div
              className="flex items-center w-full justify-between py-1"
              key={field.id}
            >
              <div className="flex flex-col w-full">
                <FormLabel
                  htmlFor={`attribute.${index}.${field.label}`}
                  className="block font-medium mb-2"
                >
                  {field.label}{" "}
                  {field.isRequired ? (
                    <span className="text-red-800">*</span>
                  ) : null}
                </FormLabel>
                {boxToRender(field, index)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
