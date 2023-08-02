import { useFormContext, useWatch } from "react-hook-form";
import { CreateTemplateFormData } from "../../models";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import { Select, SelectData, Toggle } from "..";

interface AttributePanelProps {
  readonly index: number;
  readonly onRemove: (index: number) => void;
}

export const AttributePanel = ({ index, onRemove }: AttributePanelProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const {
    register,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<CreateTemplateFormData>();

  const attributeNameLive = useWatch({
    name: `attributes.${index}.name`,
    control,
  });

  const attributeIsRequiredLive = useWatch({
    name: `attributes.${index}.isRequired`,
    control,
  });

  useEffect(() => {
    trigger(`attributes.${index}`);
  }, [index, trigger]);

  useEffect(() => {
    if (attributeIsRequiredLive) {
      setValue(`attributes.${index}.isHidden`, false);
    }
  }, [attributeIsRequiredLive, index, setValue]);

  const dataTypeData: SelectData[] = [
    { id: "JM", value: "John Mayer" },
    { id: "SRV", value: "Stevie Ray Vaughn" },
    { id: "JH", value: "Jimi Hendrix" },
    { id: "BBK", value: "B.B King" },
    { id: "AK", value: "Albert King" },
    { id: "BG", value: "Buddy Guy" },
    { id: "EC", value: "Eric Clapton" },
  ];

  return (
    <div className="flex justify-between items-center gap-2">
      <details
        className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden w-full"
        open={open}
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
          onClick={() => {
            event?.preventDefault();
            setOpen(!open);
          }}
        >
          <span className="font-normal italic text-sm">
            {attributeNameLive ? attributeNameLive : "Unititled Attribute"}
          </span>

          <div className="flex gap-5">
            {open ? <FaChevronUp /> : <FaChevronDown />}
            <FaTrashAlt
              onClick={() => onRemove(index)}
              className="hover:cursor-pointer"
            />
          </div>
        </summary>
        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will be the name of your attribute.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <input
                id="name"
                type="text"
                className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
                  errors.attributes?.[index]?.name ? "border-red-600" : ""
                }`}
                {...register(`attributes.${index}.name`)}
              />
              {errors.attributes?.[index]?.name && (
                <span className="text-xs text-red-600">
                  {errors.attributes?.[index]?.name?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor="dataType"
                className="block text-sm font-medium text-gray-700"
              >
                Data Type
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will be the data type of your attribute.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Select
                id="dataType"
                widthClassName="w-64"
                data={dataTypeData}
                {...register(`attributes.${index}.dataType`)}
                errorClassName={
                  errors.attributes?.[index]?.dataType ? "border-red-600" : ""
                }
              />
              {errors.attributes?.[index]?.dataType && (
                <span className="text-xs text-red-600">
                  {errors.attributes?.[index]?.dataType?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor="required"
                className="block text-sm font-medium text-gray-700"
              >
                Required
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will mark the attribute as a required field.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Toggle
                id="required"
                {...register(`attributes.${index}.isRequired`)}
              />
              {errors.attributes?.[index]?.isRequired && (
                <span className="text-xs text-red-600">
                  {errors.attributes?.[index]?.isRequired?.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor="hidden"
                className="block text-sm font-medium text-gray-700"
              >
                Hidden
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will mark the attribute as a hidden field.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Toggle
                id="hidden"
                {...register(`attributes.${index}.isHidden`)}
                isDisabled={attributeIsRequiredLive}
              />
              {attributeIsRequiredLive ? (
                <span className="text-gray-600 text-xs">
                  An attribute marked as required cannot be hidden
                </span>
              ) : null}
              {errors.attributes?.[index]?.isHidden && (
                <span className="text-xs text-red-600">
                  {errors.attributes?.[index]?.isHidden?.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};
