import { useFormContext } from "react-hook-form";
import { Select, Toggle } from "../../..";
import { CreateTemplateFormData } from "../../../../models";

export const BasicInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateTemplateFormData>();

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-5 px-10 items-center overflow-scroll h-[27rem]">
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
            {...register("basicInformation.parent", { required: true })}
            errorClassName={
              errors.basicInformation?.parent ? "border-red-600" : ""
            }
          />
          {errors.basicInformation?.parent && (
            <span className="text-xs text-red-600">
              {errors.basicInformation?.parent.message}
            </span>
          )}
        </div>
      </div>
      <hr className="w-[84%] my-6" />
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
            {...register("basicInformation.name", {
              required: true,
              minLength: 1,
            })}
          />
          {errors.basicInformation?.name && (
            <span className="text-xs text-red-600">
              {errors.basicInformation?.name.message}
            </span>
          )}
        </div>
      </div>
      <hr className="w-[84%] my-6" />
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
            {...register("basicInformation.externalId", { required: true })}
          />
          {errors.basicInformation?.externalId && (
            <span className="text-xs text-red-600">
              {errors.basicInformation?.externalId.message}
            </span>
          )}
        </div>
      </div>
      <hr className="w-[84%] my-6" />
      <div className="flex items-center w-full justify-between">
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
            <Toggle id="custom" value={true} isDisabled />
            <span className="text-xs text-gray-400 mt-2">
              This value cannot be changed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
