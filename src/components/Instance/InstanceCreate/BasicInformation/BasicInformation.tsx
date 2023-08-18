import { useFormContext } from "react-hook-form";
import { InstanceFormData } from "@/models";
import { useParentTemplates } from "@/service";
import { Select } from "@/components/shared";
import { useEffect, useState } from "react";
import { useInstanceCreateForm } from "@/service/instance";

export const BasicInformation = () => {
  const { register } = useFormContext<InstanceFormData>();
  const [selectedParent, setSelectedParent] = useState<string>();
  const { data: parentTemplates } = useParentTemplates();

  const {
    data: instanceCreateFormData,
    isFetching: isFetchingInstanceCreateFormData,
  } = useInstanceCreateForm(selectedParent);

  const handleOnParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setSelectedParent(e.target.value);
    }
  };

  useEffect(() => {
    console.log("instanceCreateFormData: ", instanceCreateFormData);
  }, [instanceCreateFormData]);

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
            onChange={handleOnParentChange}
            isDisabled={isFetchingInstanceCreateFormData}
          />
        </div>
      </div>
      <hr className="w-full my-6" />
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col w-96">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Instance Name
          </label>
          <span className="text-xs text-gray-400 mt-2 w-60">
            This will be the name of your instance.
          </span>
        </div>
        <div className="flex flex-col">
          <input
            id="name"
            type="text"
            className={
              "w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700"
            }
            {...register("basicInformation.name")}
            disabled={isFetchingInstanceCreateFormData}
          />
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
            A unique identifier for your instance.
          </span>
        </div>
        <div className="flex flex-col">
          <input
            id="externalId"
            type="text"
            className={
              "w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700"
            }
            {...register("basicInformation.externalId")}
            disabled={isFetchingInstanceCreateFormData}
          />
        </div>
      </div>
    </div>
  );
};
