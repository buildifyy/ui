import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { TemplateFormData } from "../../../../models";
import { useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";
import { Select, SelectData, Toggle } from "../../../shared";

interface AttributePanelProps {
  readonly index: number;
  readonly onRemove?: (index: number) => void;
  readonly onToggleExpand: (index: number) => void;
  readonly isReadonly?: boolean;
}

export const AttributePanel = ({
  index,
  onRemove,
  onToggleExpand,
  isReadonly,
}: AttributePanelProps) => {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<TemplateFormData>();

  const { fields: attributes } = useFieldArray({
    control,
    name: `attributes`,
    keyName: "_id",
  });
  const attribute = attributes[index];

  const attributeNameLive = useWatch({
    name: `attributes.${index}.name`,
    control,
  });

  const attributeIsRequiredLive = useWatch({
    name: `attributes.${index}.isRequired`,
    control,
  });

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
        open={getValues(`attributes.${index}.isExpanded`)}
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
          onClick={() => {
            event?.preventDefault();
            onToggleExpand(index);
          }}
        >
          <span className="font-normal italic text-sm">
            {attributeNameLive ? attributeNameLive : "Untitled Attribute"}
          </span>

          <div className="flex gap-5">
            {getValues(`attributes.${index}.isExpanded`) ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
            <FaTrashAlt
              onClick={(event: React.MouseEvent) => {
                if (onRemove) {
                  onRemove(index);
                }
                event?.stopPropagation();
              }}
              className="hover:cursor-pointer"
              disabled={isReadonly}
            />
          </div>
        </summary>
        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`name.${attribute?._id}`}
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
                id={`name.${attribute?._id}`}
                type="text"
                className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
                  !isReadonly && errors.attributes?.[index]?.name
                    ? "border-red-600"
                    : ""
                }`}
                {...register(`attributes.${index}.name`)}
                disabled={isReadonly}
              />
              {!isReadonly && errors.attributes?.[index]?.name && (
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
                htmlFor={`dataType.${attribute?._id}`}
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
                id={`dataType.${attribute?._id}`}
                widthClassName="w-64"
                data={dataTypeData}
                {...register(`attributes.${index}.dataType`)}
                errorClassName={
                  !isReadonly && errors.attributes?.[index]?.dataType
                    ? "border-red-600"
                    : ""
                }
                isDisabled={isReadonly}
              />
              {!isReadonly && errors.attributes?.[index]?.dataType && (
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
                htmlFor={`required.${attribute?._id}`}
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
                id={`required.${attribute?._id}`}
                {...register(`attributes.${index}.isRequired`)}
                isDisabled={isReadonly}
              />
              {!isReadonly && errors.attributes?.[index]?.isRequired && (
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
                htmlFor={`hidden.${attribute?._id}`}
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
                id={`hidden.${attribute?._id}`}
                {...register(`attributes.${index}.isHidden`)}
                isDisabled={isReadonly || attributeIsRequiredLive}
              />
              {!isReadonly && attributeIsRequiredLive ? (
                <span className="text-gray-600 text-xs">
                  An attribute marked as required cannot be hidden
                </span>
              ) : null}
              {!isReadonly && errors.attributes?.[index]?.isHidden && (
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
