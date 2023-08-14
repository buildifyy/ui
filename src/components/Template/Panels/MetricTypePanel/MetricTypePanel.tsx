import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FaChevronUp, FaTrashAlt, FaChevronRight } from "react-icons/fa";
import { Dropdown, TemplateFormData } from "../../../../models";
import { AddPanel, Select } from "../../../shared";
import { MetricPanel } from "../MetricPanel";
import { useState } from "react";

interface MetricTypePanelProps {
  readonly index: number;
  readonly onRemove?: (index: number) => void;
  readonly isReadonly?: boolean;
  readonly dropdownValues?: Dropdown[];
}

export const MetricTypePanel = ({
  index,
  onRemove,
  isReadonly,
  dropdownValues,
}: MetricTypePanelProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TemplateFormData>();
  const { fields: metricTypes } = useFieldArray({
    control,
    name: `metricTypes`,
    keyName: "_id",
  });
  const metricType = metricTypes[index];
  const [isVisible, setIsVisible] = useState(metricType?.isNew && index === 0);

  const {
    fields: metrics,
    prepend,
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
    prepend({
      name: "",
      isSourced: false,
      isManual: false,
      isCalculated: false,
    });
  };

  const handleRemoveMetric = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <details
        className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden w-full"
        open={isVisible}
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
          onClick={() => {
            event?.preventDefault();
            setIsVisible(!isVisible);
          }}
        >
          <span className="font-normal italic text-sm">
            {metricTypeNameLive ? metricTypeNameLive : "Untitled Metric Type"}
          </span>

          <div className="flex gap-5">
            {isVisible ? <FaChevronUp /> : <FaChevronRight />}
            {!isReadonly && metricType?.isNew ? (
              <button>
                <FaTrashAlt
                  onClick={(event: React.MouseEvent) => {
                    if (onRemove) {
                      onRemove(index);
                    }
                    event?.stopPropagation();
                  }}
                />
              </button>
            ) : null}
          </div>
        </summary>
        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`name.${metricType?._id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will be the name of your metric type.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <input
                id={`name.${metricType?._id}`}
                type="text"
                className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
                  !isReadonly && errors.metricTypes?.[index]?.name
                    ? "border-red-600"
                    : ""
                }`}
                {...register(`metricTypes.${index}.name`)}
                disabled={isReadonly}
              />
              {!isReadonly && errors.metricTypes?.[index]?.name && (
                <span className="text-xs text-red-600">
                  {errors.metricTypes?.[index]?.name?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`metricType.${metricType?._id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will be the type of your metric.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Select
                id={`metricType.${metricType?._id}`}
                widthClassName="w-64"
                data={dropdownValues}
                {...register(`metricTypes.${index}.metricType`)}
                errorClassName={
                  !isReadonly && errors.metricTypes?.[index]?.metricType
                    ? "border-red-600"
                    : ""
                }
                isDisabled={isReadonly}
              />
              {!isReadonly && errors.metricTypes?.[index]?.metricType && (
                <span className="text-xs text-red-600">
                  {errors.metricTypes?.[index]?.metricType?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex justify-between">
            {metrics.length !== 0 ? (
              <span className="text-md text-green-600">
                {metrics.length}
                {metrics.length > 1 ? " metrics" : " metric"}
              </span>
            ) : null}
          </div>
          {!isReadonly && (
            <AddPanel
              title="Add Metric"
              onAdd={handleAddMetric}
              className="mt-4"
            />
          )}
          <span className="text-xs text-red-600">
            {!isReadonly && errors.metricTypes?.[index]?.metrics?.message}
          </span>
          {metrics.map((metric, metricIndex) => {
            return (
              <MetricPanel
                key={metric._id}
                index={metricIndex}
                metricTypeIndex={index}
                onRemove={handleRemoveMetric}
                isReadonly={isReadonly}
                isMetricTypeNew={metricType?.isNew}
              />
            );
          })}
        </div>
      </details>
    </div>
  );
};
