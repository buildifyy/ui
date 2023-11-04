import { useFormContext } from "react-hook-form";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/shared";
import React from "react";
import { FormDescription, FormLabel } from "@/components/ui/form";

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
            className="w-64 border p-2 rounded shadow-sm"
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
            className="w-64 border p-2 rounded shadow-sm"
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
            className="w-64 border p-2 rounded shadow-sm"
            placeholder={`${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
            disabled
          />
        );
      case "bool":
        return (
          <Select
            id="parent"
            widthClassName="w-64"
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
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)]">
      <div className="space-y-4 w-full">
        {fields?.map((field, index) => {
          return (
            <React.Fragment key={index}>
              {index !== 0 && <hr className="w-full my-6" />}
              <div className="flex items-center w-full justify-between py-1">
                <div className="flex flex-col w-96">
                  <FormLabel
                    htmlFor={`attribute.${index}.${field.label}`}
                    className="block font-medium"
                  >
                    {field.label}{" "}
                    {field.isRequired ? (
                      <span className="text-red-800">*</span>
                    ) : null}
                  </FormLabel>
                  {field.infoText && (
                    <FormDescription className="mt-1 w-60">
                      {field.infoText}
                    </FormDescription>
                  )}
                </div>
                <div className="flex flex-col">{boxToRender(field, index)}</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
