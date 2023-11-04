import { Controller, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { Select, OnOff } from "@/components/shared";
import { useParentTemplates } from "@/service";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const BasicInformation = () => {
  const { register, control } = useFormContext<TemplateFormData>();

  const { data: parentTemplates } = useParentTemplates();

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-5 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
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
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col w-96">
          <FormLabel htmlFor="name" className="block font-medium">
            Template Name
          </FormLabel>
          <FormDescription className="mt-1 w-60">
            This will be the name of your template.
          </FormDescription>
        </div>
        <div className="flex flex-col">
          <Input
            id="name"
            type="text"
            className={`w-64 h-8 p-2 rounded shadow-sm`}
            {...register("basicInformation.name")}
            disabled
          />
        </div>
      </div>
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col w-96">
          <FormLabel htmlFor="externalId" className="block font-medium">
            External ID
          </FormLabel>
          <FormDescription className="mt-1">
            A unique identifier for your template.
          </FormDescription>
        </div>
        <div className="flex flex-col">
          <Input
            id="externalId"
            type="text"
            className={`w-64 h-8 p-2 rounded shadow-sm`}
            {...register("basicInformation.externalId")}
            disabled
          />
        </div>
      </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};
