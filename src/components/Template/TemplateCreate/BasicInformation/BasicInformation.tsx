import { Controller, useFormContext, useWatch } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { useEffect, useState } from "react";
import { Select, OnOff } from "@/components/shared";
import { useParentTemplates, useTemplateView } from "@/service";
import { useLocation } from "react-router-dom";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const BasicInformation = () => {
  const location = useLocation();
  const {
    control,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext<TemplateFormData>();
  const [selectedParent, setSelectedParent] = useState<string>();
  const isEditMode = location.pathname.includes("/edit");

  const { data: parentTemplates } = useParentTemplates();

  const basicInformationNameLive = useWatch({
    name: "basicInformation.name",
    control,
  });

  const { data: parentTemplateData, isFetching: isFetchingParentTemplateData } =
    useTemplateView(selectedParent);

  useEffect(() => {
    if (parentTemplateData) {
      reset((prev) => {
        return {
          tenant: prev.tenant,
          basicInformation: {
            ...prev.basicInformation,
            parent: selectedParent ?? prev.basicInformation.parent,
          },
          attributes: parentTemplateData.attributes,
          metricTypes: parentTemplateData.metricTypes,
        };
      });
    }
  }, [parentTemplateData]);

  useEffect(() => {
    if (basicInformationNameLive !== null && !isEditMode) {
      const valueToSet = basicInformationNameLive?.replace(/\s/g, "");
      setValue("basicInformation.externalId", valueToSet?.toLowerCase());
    }
  }, [basicInformationNameLive, setValue]);

  const handleOnParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setSelectedParent(e.target.value);
    }
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-5 px-10 items-center overflow-y-auto h-[calc(100vh-220px)]">
      <div className="flex items-center w-full justify-between pt-5 overflow-y-auto px-2">
        <div className="flex flex-col w-96">
          <FormLabel htmlFor="parent" className="block font-medium">
            Parent Template
          </FormLabel>
          <FormDescription className="mt-1">
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
            errorClassName={
              errors.basicInformation?.parent ? "border-red-600" : ""
            }
            isDisabled={isFetchingParentTemplateData || isEditMode}
            onChange={handleOnParentChange}
          />
          {errors.basicInformation?.parent && (
            <FormDescription className="text-red-800 mt-1">
              {errors.basicInformation?.parent.message}
            </FormDescription>
          )}
        </div>
      </div>
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between px-2">
        <div className="flex flex-col w-96">
          <FormLabel htmlFor="name" className="block font-medium">
            Template Name
          </FormLabel>
          <FormDescription className="mt-1">
            This will be the name of your template.
          </FormDescription>
        </div>
        <div className="flex flex-col">
          <Input
            id="name"
            type="text"
            className={`w-64 p-2 rounded shadow-sm ${
              errors.basicInformation?.name ? "border-red-800" : ""
            }`}
            {...register("basicInformation.name")}
            disabled={isFetchingParentTemplateData}
          />
          {errors.basicInformation?.name && (
            <FormDescription className="text-red-800 mt-1">
              {errors.basicInformation?.name.message}
            </FormDescription>
          )}
        </div>
      </div>
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between px-2">
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
            className={`w-64 p-2 rounded shadow-sm  ${
              errors.basicInformation?.externalId ? "border-red-800" : ""
            }`}
            {...register("basicInformation.externalId")}
            disabled={isFetchingParentTemplateData || isEditMode}
          />
          {errors.basicInformation?.externalId && (
            <FormDescription className="text-red-800 mt-1">
              {errors.basicInformation?.externalId.message}
            </FormDescription>
          )}
        </div>
      </div>
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between mb-3 px-2">
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
