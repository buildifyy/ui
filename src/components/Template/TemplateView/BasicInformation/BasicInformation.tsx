import { useFormContext } from "react-hook-form";
import { TemplateFormData } from "../../../../models";
import { Select, SelectData, Toggle } from "../../../shared";

export const BasicInformation = () => {
  const { register } = useFormContext<TemplateFormData>();

  const parentTemplateData: SelectData[] = [
    { id: "JM", value: "John Mayer" },
    { id: "SRV", value: "Stevie Ray Vaughn" },
    { id: "JH", value: "Jimi Hendrix" },
    { id: "BBK", value: "B.B King" },
    { id: "AK", value: "Albert King" },
    { id: "BG", value: "Buddy Guy" },
    { id: "EC", value: "Eric Clapton" },
  ];

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
            data={parentTemplateData}
            {...register("basicInformation.parent")}
            isDisabled
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
            className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700`}
            {...register("basicInformation.name")}
            disabled
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
            A unique identifier for your template.
          </span>
        </div>
        <div className="flex flex-col">
          <input
            id="externalId"
            type="text"
            className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700`}
            {...register("basicInformation.externalId")}
            disabled
          />
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
            <Toggle
              id="custom"
              value={true}
              {...register("basicInformation.isCustom")}
              isDisabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};
