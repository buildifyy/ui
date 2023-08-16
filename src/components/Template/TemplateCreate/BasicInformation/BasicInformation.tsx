import { Controller, useFormContext, useWatch } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { useEffect, useState } from "react";
import { Select, OnOff } from "@/components/shared";
import { useParentTemplates, useTemplateView } from "@/service";

export const BasicInformation = () => {
  const {
    control,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext<TemplateFormData>();
  const [selectedParent, setSelectedParent] = useState<string>();

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
    if (basicInformationNameLive !== null) {
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
    <div className="flex flex-col mt-5 mx-10 border rounded py-5 px-10 items-center overflow-y-auto max-h-[35rem]">
      <div className="flex items-center w-full justify-between pt-5">
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
            {...register("basicInformation.parent")}
            errorClassName={
              errors.basicInformation?.parent ? "border-red-600" : ""
            }
            isDisabled={isFetchingParentTemplateData}
            onChange={handleOnParentChange}
          />
          {errors.basicInformation?.parent && (
            <span className="text-xs text-red-600">
              {errors.basicInformation?.parent.message}
            </span>
          )}
        </div>
      </div>
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col w-96">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Template Name
          </label>
          <span className="text-xs text-gray-400 mt-2 w-60">
            This will be the name of your template.
          </span>
        </div>
        <div className="flex flex-col">
          <input
            id="name"
            type="text"
            className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
              errors.basicInformation?.name ? "border-red-600" : ""
            }`}
            {...register("basicInformation.name")}
            disabled={isFetchingParentTemplateData}
          />
          {errors.basicInformation?.name && (
            <span className="text-xs text-red-600">
              {errors.basicInformation?.name.message}
            </span>
          )}
        </div>
      </div>
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col w-96">
          <label
            htmlFor="externalId"
            className="block text-sm font-medium text-gray-700"
          >
            External ID
          </label>
          <span className="text-xs text-gray-400 mt-2">
            A unique identifier for your template.
          </span>
        </div>
        <div className="flex flex-col">
          <input
            id="externalId"
            type="text"
            className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
              errors.basicInformation?.externalId ? "border-red-600" : ""
            }`}
            {...register("basicInformation.externalId")}
            disabled={isFetchingParentTemplateData}
          />
          {errors.basicInformation?.externalId && (
            <span className="text-xs text-red-600">
              {errors.basicInformation?.externalId.message}
            </span>
          )}
        </div>
      </div>
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between mb-3">
        <div className="flex flex-col w-96">
          <label
            htmlFor="custom"
            className="block text-sm font-medium text-gray-700"
          >
            Custom
          </label>
          <span className="text-xs text-gray-400 mt-2">
            Specifies if the template is custom or out-of-the-box.
          </span>
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
            <span className="text-xs text-gray-400 mt-2">
              This value cannot be changed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
