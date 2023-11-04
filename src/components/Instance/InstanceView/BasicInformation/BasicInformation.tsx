import { Controller, useFormContext } from "react-hook-form";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { Select, OnOff } from "@/components/shared";
import { useParentTemplates } from "@/service";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

interface BasicInformationProps {
  readonly fields?: InstanceMetaDataField[];
  readonly isLoading: boolean;
}

export const BasicInformation = ({ fields }: BasicInformationProps) => {
  const { register, control } = useFormContext<InstanceFormData>();

  const { data: parentTemplates } = useParentTemplates();

  return (
    <div className="flex flex-col my-5 mx-10 border rounded py-5 px-10 items-center overflow-y-auto h-[calc(100vh-220px)]">
      <div className="flex items-center w-full justify-between pt-5">
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
            {...register("basicInformation.parent")}
            isDisabled
          />
        </div>
      </div>
      {fields?.map((field, i) => {
        if (field.type === "string") {
          const registerKey =
            field.label === "Name"
              ? "basicInformation.name"
              : "basicInformation.externalId";
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
                    className="w-64 border p-2 rounded shadow-sm"
                    {...register(registerKey)}
                    disabled
                  />
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
            Specifies if the instance is custom or out-of-the-box.
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
          </div>
        </div>
      </div>
    </div>
  );
};
