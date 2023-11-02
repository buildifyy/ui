import { useParentTemplates } from "@/service";
import { OnOff, Select } from "@/components/shared";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import React, { useEffect } from "react";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface BasicInformationProps {
  readonly fields?: InstanceMetaDataField[];
  readonly isLoading: boolean;
}

export const BasicInformation = ({
  fields,
  isLoading,
}: BasicInformationProps) => {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<InstanceFormData>();
  const { data: parentTemplates } = useParentTemplates();

  const basicInformationNameLive = useWatch({
    name: "basicInformation.name",
    control,
  });

  useEffect(() => {
    if (basicInformationNameLive !== null) {
      const valueToSet = basicInformationNameLive?.replace(/\s/g, "");
      setValue("basicInformation.externalId", valueToSet?.toLowerCase());
    }
  }, [basicInformationNameLive, setValue]);

  return (
    <div className="flex flex-col my-5 mx-10 border rounded py-5 px-10 items-center overflow-y-auto max-h-[35rem]">
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col w-96">
          <FormLabel htmlFor="parent" className="block font-medium">
            Parent Template
          </FormLabel>
          <FormDescription className="mt-1 w-60">
            Attributes, Relationships and Metric Types will be inherited from
            this template.
          </FormDescription>
        </div>
        <div className="flex flex-col">
          <Select
            id="parent"
            widthClassName="w-64"
            data={parentTemplates}
            errorClassName={
              errors.basicInformation?.parent ? "border-red-800" : ""
            }
            {...register("basicInformation.parent")}
            isDisabled={isLoading}
          />
          {errors.basicInformation?.parent && (
            <FormDescription className="mt-1 text-red-800">
              {errors.basicInformation?.parent.message}
            </FormDescription>
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
                  <FormLabel
                    htmlFor={field.label}
                    className="block font-medium"
                  >
                    {field.label}
                  </FormLabel>
                  <FormDescription className="mt-1 w-60">
                    {field.infoText}
                  </FormDescription>
                </div>
                <div className="flex flex-col">
                  <Input
                    id={field.label}
                    type="text"
                    className={`w-64 border p-2 rounded shadow-sm ${
                      fieldError ? "border-red-800" : ""
                    }`}
                    {...register(registerKey)}
                    disabled={isLoading}
                  />
                  {fieldError && (
                    <FormDescription className="mt-1 text-red-800">
                      {fieldError.message}
                    </FormDescription>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        }
      })}
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between mb-3">
        <div className="flex flex-col w-96">
          <FormLabel htmlFor="custom" className="block font-medium">
            Custom
          </FormLabel>
          <FormDescription className="mt-1">
            Specifies if the template is custom or out-of-the-box.
          </FormDescription>
        </div>
        <div className="flex w-64">
          <div className="flex flex-col w-96 items-end">
            <Controller
              control={control}
              name="basicInformation.isCustom"
              defaultValue={true}
              render={({ field: { value, onChange, onBlur } }) => (
                <OnOff
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  disabled
                />
              )}
            />
            <FormDescription className="mt-1">
              This value cannot be changed
            </FormDescription>
          </div>
        </div>
      </div>
    </div>
  );
};
