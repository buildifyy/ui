import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Dropdown, TemplateFormData } from "@/models";
import { AddPanel, Select } from "@/components/shared";
import { MetricPanel } from "@/components/Template";
import { useState } from "react";
import { ChevronRight, ChevronUp, Trash } from "lucide-react";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface MetricTypePanelProps {
  readonly index: number;
  readonly onRemove?: (index: number) => void;
  readonly isReadonly?: boolean;
  readonly dropdownValues?: Dropdown[];
  readonly isNew?: boolean;
}

export const MetricTypePanel = ({
  index,
  onRemove,
  isReadonly,
  dropdownValues,
  isNew,
}: MetricTypePanelProps) => {
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useFormContext<TemplateFormData>();
  const { fields: metricTypes } = useFieldArray({
    control,
    name: `metricTypes`,
    keyName: "_id",
  });
  const metricType = metricTypes[index];
  const [isVisible, setIsVisible] = useState(
    metricType?.isNew && (index === 0 || index === metricTypes.length - 1)
  );

  const {
    fields: metrics,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `metricTypes.${index}.metrics`,
    keyName: "_id",
  });

  const metricTypeNameLive = useWatch({
    name: `metricTypes.${index}.name`,
    control,
  });

  const handleAddMetric = () => {
    append({
      name: "",
      isSourced: false,
      isManual: false,
      isCalculated: false,
      isNew: true,
    });
  };

  const handleRemoveMetric = (index: number) => {
    remove(index);
  };

  const showTrashButton =
    isNew ||
    (metricType?.owningTemplate === getValues("basicInformation.externalId") &&
      !isReadonly);

  return (
    <div className="flex justify-between items-center gap-2">
      <details
        className="group rounded-lg border p-3 [&_summary::-webkit-details-marker]:hidden w-full"
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
            {metricTypeNameLive ? metricTypeNameLive : "Untitled Metric Type"}
          </span>

          <div className="flex gap-5">
            {isVisible ? (
              <ChevronUp height={17} width={17} />
            ) : (
              <ChevronRight height={17} width={17} />
            )}
            {showTrashButton && (
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
        <div className="p-2">
          <div className="mt-4 leading-relaxed">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col w-96">
                <FormLabel
                  htmlFor={`name.${metricType?._id}`}
                  className="block font-medium"
                >
                  Name
                </FormLabel>
                <FormDescription className="mt-1">
                  This will be the name of your metric type.
                </FormDescription>
              </div>
              <div className="flex flex-col items-end">
                <Input
                  id={`name.${metricType?._id}`}
                  type="text"
                  className={`w-64 p-2 rounded shadow-sm ${
                    !isReadonly && errors.metricTypes?.[index]?.name
                      ? "border-red-800"
                      : ""
                  }`}
                  {...register(`metricTypes.${index}.name`)}
                  disabled={isReadonly}
                />
                {!isReadonly && errors.metricTypes?.[index]?.name && (
                  <FormDescription className="text-red-800">
                    {errors.metricTypes?.[index]?.name?.message}
                  </FormDescription>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 leading-relaxed">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col w-96">
                <FormLabel
                  htmlFor={`metricType.${metricType?._id}`}
                  className="block font-medium"
                >
                  Type
                </FormLabel>
                <FormDescription className="mt-1">
                  This will be the type of your metric.
                </FormDescription>
              </div>
              <div className="flex flex-col items-end">
                <Select
                  id={`metricType.${metricType?._id}`}
                  widthClassName="w-64"
                  data={dropdownValues}
                  {...register(`metricTypes.${index}.metricType`)}
                  errorClassName={
                    !isReadonly && errors.metricTypes?.[index]?.metricType
                      ? "border-red-800"
                      : ""
                  }
                  isDisabled={isReadonly}
                />
                {!isReadonly && errors.metricTypes?.[index]?.metricType && (
                  <FormDescription className="text-red-800 mt-1">
                    {errors.metricTypes?.[index]?.metricType?.message}
                  </FormDescription>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 leading-relaxed">
            <div className="flex justify-between">
              {metrics.length !== 0 ? (
                <span className="text-md text-green-600">
                  {metrics.length}
                  {metrics.length > 1 ? " metrics" : " metric"}
                </span>
              ) : null}
            </div>
            {!isReadonly && (
              <AddPanel title="Add Metric" onAdd={handleAddMetric} />
            )}
            <FormDescription className="text-red-800">
              {!isReadonly && errors.metricTypes?.[index]?.metrics?.message}
            </FormDescription>
            {metrics.map((metric, metricIndex) => {
              return (
                <MetricPanel
                  key={metric._id}
                  index={metricIndex}
                  metricTypeIndex={index}
                  onRemove={handleRemoveMetric}
                  isReadonly={isReadonly}
                />
              );
            })}
          </div>
        </div>
      </details>
    </div>
  );
};
