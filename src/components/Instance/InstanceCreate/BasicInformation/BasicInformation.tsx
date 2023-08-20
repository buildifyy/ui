import { useParentTemplates } from "@/service";
import { Select } from "@/components/shared";
import { useFormContext } from "react-hook-form";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import React from "react";

interface BasicInformationProps {
  readonly fields?: InstanceMetaDataField[];
  readonly isLoading: boolean;
}

export const BasicInformation = ({
  fields,
  isLoading,
}: BasicInformationProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<InstanceFormData>();
  const { data: parentTemplates } = useParentTemplates();

  return (
    <div className="flex flex-col my-5 mx-10 border rounded py-5 px-10 items-center overflow-y-auto max-h-[35rem]">
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col w-96">
          <label
            htmlFor="parent"
            className="block text-sm font-medium text-gray-700"
          >
            Parent Template
          </label>
          <span className="text-xs text-gray-400 mt-2 w-60">
            Attributes, Relationships and Metric Types will be inherited from
            this template.
          </span>
        </div>
        <div className="flex flex-col">
          <Select
            id="parent"
            widthClassName="w-64"
            data={parentTemplates}
            errorClassName={
              errors.basicInformation?.parent ? "border-red-600" : ""
            }
            {...register("basicInformation.parent")}
            isDisabled={isLoading}
          />
          {errors.basicInformation?.parent && (
            <span className="text-xs text-red-600">
              {errors.basicInformation?.parent.message}
            </span>
          )}
        </div>
      </div>
      {fields?.map((field, i) => {
        if (field.type === "string") {
          const registerKey =
            field.label === "Name"
              ? "basicInformation.name"
              : "basicInformation.externalId";
          const fieldError =
            field.label === "Name"
              ? errors.basicInformation?.name
              : errors.basicInformation?.externalId;
          return (
            <React.Fragment key={i}>
              <hr className="w-full my-6" />
              <div className="flex items-center w-full justify-between">
                <div className="flex flex-col w-96">
                  <label
                    htmlFor={field.label}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <span className="text-xs text-gray-400 mt-2 w-60">
                    {field.infoText}
                  </span>
                </div>
                <div className="flex flex-col">
                  <input
                    id={field.label}
                    type="text"
                    className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
                      fieldError ? "border-red-600" : ""
                    }`}
                    {...register(registerKey)}
                    disabled={isLoading}
                  />
                  {fieldError && (
                    <span className="text-xs text-red-600">
                      {fieldError.message}
                    </span>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};
