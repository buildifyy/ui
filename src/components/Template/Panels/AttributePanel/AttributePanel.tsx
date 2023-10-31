import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Dropdown, TemplateFormData } from "@/models";
import { useEffect, useState } from "react";
import { OnOff, Select } from "@/components/shared";
import { ChevronRight, ChevronUp, Trash } from "lucide-react";
import { FormDescription, FormLabel } from "../../../ui/form";
import { Input } from "../../../ui/input";

interface AttributePanelProps {
  readonly index: number;
  readonly onRemove?: (index: number) => void;
  readonly isReadonly?: boolean;
  readonly dropdownValues?: Dropdown[];
}

export const AttributePanel = ({
  index,
  onRemove,
  isReadonly,
  dropdownValues,
}: AttributePanelProps) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TemplateFormData>();

  const { fields: attributes } = useFieldArray({
    control,
    name: `attributes`,
    keyName: "_id",
  });

  const attribute = attributes[index];
  const [isVisible, setIsVisible] = useState(
    attribute?.isNew && (index === 0 || index === attributes.length - 1)
  );

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

  return (
    <div className="flex justify-between items-center gap-2">
      <details
        className="group rounded-lg border p-6 [&_summary::-webkit-details-marker]:hidden w-full"
        open={isVisible}
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5"
          onClick={() => {
            event?.preventDefault();
            setIsVisible(!isVisible);
          }}
        >
          <span className="font-bold italic">
            {attributeNameLive ? attributeNameLive : "Untitled Attribute"}
          </span>

          <div className="flex gap-5">
            {isVisible ? (
              <ChevronUp height={17} width={17} />
            ) : (
              <ChevronRight height={17} width={17} />
            )}

            {!isReadonly && (
              <button>
                <Trash
                  width={17}
                  height={17}
                  onClick={(event: React.MouseEvent) => {
                    if (onRemove) {
                      onRemove(index);
                    }
                    event?.stopPropagation();
                  }}
                />
              </button>
            )}
          </div>
        </summary>
        <div className="mt-4 leading-relaxed text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <FormLabel
                htmlFor={`name.${attribute?._id}`}
                className="block font-medium"
              >
                Name
              </FormLabel>
              <FormDescription className="mt-1">
                This will be the name of your attribute.
              </FormDescription>
            </div>
            <div className="flex flex-col items-end">
              <Input
                id={`name.${attribute?._id}`}
                type="text"
                className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm ${
                  !isReadonly && errors.attributes?.[index]?.name
                    ? "border-red-800"
                    : ""
                }`}
                {...register(`attributes.${index}.name`)}
                disabled={isReadonly}
              />
              {!isReadonly && errors.attributes?.[index]?.name && (
                <FormDescription className="text-red-800 mt-1">
                  {errors.attributes?.[index]?.name?.message}
                </FormDescription>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 leading-relaxed text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <FormLabel
                htmlFor={`dataType.${attribute?._id}`}
                className="block font-medium"
              >
                Data Type
              </FormLabel>
              <FormDescription className="mt-1">
                This will be the data type of your attribute.
              </FormDescription>
            </div>
            <div className="flex flex-col items-end">
              <Select
                id={`dataType.${attribute?._id}`}
                widthClassName="w-64"
                data={dropdownValues}
                {...register(`attributes.${index}.dataType`)}
                errorClassName={
                  !isReadonly && errors.attributes?.[index]?.dataType
                    ? "border-red-800"
                    : ""
                }
                isDisabled={isReadonly}
              />
              {!isReadonly && errors.attributes?.[index]?.dataType && (
                <FormDescription className="text-red-800 mt-1">
                  {errors.attributes?.[index]?.dataType?.message}
                </FormDescription>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 leading-relaxed text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <FormLabel
                htmlFor={`required.${attribute?._id}`}
                className="block font-medium"
              >
                Required
              </FormLabel>
              <FormDescription className="mt-1">
                This will mark the attribute as a required field.
              </FormDescription>
            </div>
            <div className="flex flex-col items-end">
              <Controller
                control={control}
                name={`attributes.${index}.isRequired`}
                defaultValue={true}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OnOff
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={isReadonly}
                  />
                )}
              />
              {!isReadonly && errors.attributes?.[index]?.isRequired && (
                <FormDescription className="text-red-800 mt-1">
                  {errors.attributes?.[index]?.isRequired?.message}
                </FormDescription>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 leading-relaxed text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <FormLabel
                htmlFor={`hidden.${attribute?._id}`}
                className="block font-medium"
              >
                Hidden
              </FormLabel>
              <FormDescription className="mt-1">
                This will mark the attribute as a hidden field.
              </FormDescription>
            </div>
            <div className="flex flex-col items-end">
              <Controller
                control={control}
                name={`attributes.${index}.isHidden`}
                defaultValue={true}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OnOff
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={isReadonly || attributeIsRequiredLive}
                  />
                )}
              />
              {!isReadonly && attributeIsRequiredLive ? (
                <FormDescription className="text-yellow-800 mt-1">
                  An attribute marked as required cannot be hidden
                </FormDescription>
              ) : null}
              {!isReadonly && errors.attributes?.[index]?.isHidden && (
                <FormDescription className="text-red-800 mt-1">
                  {errors.attributes?.[index]?.isHidden?.message}
                </FormDescription>
              )}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};
