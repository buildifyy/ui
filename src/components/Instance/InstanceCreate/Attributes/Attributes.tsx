import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useFormContext } from "react-hook-form";
import { Select } from "@/components/shared";
import { useEffect } from "react";

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
  }, [fields]);

  const boxToRender = (field: InstanceMetaDataField, index: number) => {
    switch (field.type) {
      case "string":
        return (
          <input
            id={`attribute.${index}.${field.label}`}
            type="text"
            className={`w-64 border h-8 p-2 rounded shadow-sm text-xs text-gray-700 ${
              errors.attributes?.[index]?.value ? "border-red-600" : ""
            }`}
            placeholder={`Enter ${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
          />
        );
      case "integer":
        return (
          <input
            id={`attribute.${index}.${field.label}`}
            type="number"
            className={`w-64 border h-8 p-2 rounded shadow-sm text-gray-700 text-xs ${
              errors.attributes?.[index]?.value ? "border-red-600" : ""
            }`}
            placeholder={`Enter ${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
          />
        );
      case "float":
        return (
          <input
            id={`attribute.${index}.${field.label}`}
            type="text"
            className={`w-64 border h-8 p-2 rounded shadow-sm text-xs text-gray-700 ${
              errors.attributes?.[index]?.value ? "border-red-600" : ""
            }`}
            placeholder={`Enter ${field.label} (${field.typeLabel})`}
            {...register(`attributes.${index}.value`)}
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
            errorClassName={
              errors.attributes?.[index]?.value ? "border-red-600" : ""
            }
            {...register(`attributes.${index}.value`)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col my-5 mx-10 border rounded py-5 px-10 items-center overflow-y-auto max-h-[28rem]">
      <div className="space-y-4 w-full">
        {fields?.map((field, index) => {
          return (
            <>
              {index !== 0 && <hr className="w-full my-6" />}
              <div className="flex items-center w-full justify-between py-1">
                <div className="flex flex-col w-96">
                  <label
                    htmlFor={`attribute.${index}.${field.label}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  {field.infoText && (
                    <span className="text-xs text-gray-400 mt-2 w-60">
                      {field.infoText}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  {boxToRender(field, index)}

                  {errors.attributes?.[index]?.value && (
                    <span className="text-xs text-red-600">
                      {errors.attributes?.[index]?.value?.message}
                    </span>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
