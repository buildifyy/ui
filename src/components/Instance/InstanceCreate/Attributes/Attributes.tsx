import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useFormContext } from "react-hook-form";

interface AttributesProps {
  readonly fields?: InstanceMetaDataField[];
}

export const Attributes = ({ fields }: AttributesProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<InstanceFormData>();

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[28rem]">
      <div className="space-y-4 w-full">
        {fields?.map((field, index) => {
          if (field.type === "string") {
            return (
              <>
                {index !== 0 && <hr className="w-full my-6" />}
                <div className="flex items-center w-full justify-between py-2">
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
                    <input
                      id={`attribute.${index}.${field.label}`}
                      type="text"
                      className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
                        errors.attributes?.[index]?.value
                          ? "border-red-600"
                          : ""
                      }`}
                      {...register(`attributes.${index}.value`)}
                    />
                    {errors.attributes?.[index]?.value && (
                      <span className="text-xs text-red-600">
                        {errors.attributes?.[index]?.value?.message}
                      </span>
                    )}
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
    </div>
  );
};
