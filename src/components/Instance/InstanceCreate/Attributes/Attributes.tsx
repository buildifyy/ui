import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useFormContext } from "react-hook-form";
import { Select } from "@/components/shared";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FormDescription, FormLabel } from "@/components/ui/form";
import React from "react";

interface AttributesProps {
  readonly fields?: InstanceMetaDataField[];
}

export const Attributes = ({ fields }: AttributesProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<InstanceFormData>();

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
            className={`border p-2 rounded shadow-sm ${
              errors.attributes?.[index]?.value ? "border-red-800" : ""
            }`}
            placeholder={`Enter ${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
          />
        );
      case "integer":
        return (
          <Input
            id={`attribute.${index}.${field.label}`}
            type="number"
            className={`border p-2 rounded shadow-sm ${
              errors.attributes?.[index]?.value ? "border-red-800" : ""
            }`}
            placeholder={`Enter ${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
          />
        );
      case "float":
        return (
          <Input
            id={`attribute.${index}.${field.label}`}
            type="text"
            className={`border p-2 rounded shadow-sm ${
              errors.attributes?.[index]?.value ? "border-red-800" : ""
            }`}
            placeholder={`Enter ${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
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
            errorClassName={
              errors.attributes?.[index]?.value ? "border-red-800" : ""
            }
            {...register(`attributes.${index}.value`)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col my-5  border rounded py-5 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <div className="space-y-4 w-full px-10">
        {fields?.map((field, index) => {
          return (
            <React.Fragment key={index}>
              <div className="flex items-center w-full justify-between py-1">
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
                  {errors.attributes?.[index]?.value && (
                    <FormDescription className="text-red-800 mt-1">
                      {errors.attributes?.[index]?.value?.message}
                    </FormDescription>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
