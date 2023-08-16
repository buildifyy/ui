import { useEffect, useState } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { TemplateFormData } from "@/models";
import { OnOff } from "@/components/shared";
import { ChevronRight, ChevronUp, Trash } from "lucide-react";

interface MetricPanelProps {
  readonly index: number;
  readonly metricTypeIndex: number;
  readonly onRemove?: (index: number) => void;
  readonly isReadonly?: boolean;
  readonly isMetricTypeNew?: boolean;
}

export const MetricPanel = ({
  index,
  metricTypeIndex,
  onRemove,
  isReadonly,
  isMetricTypeNew,
}: MetricPanelProps) => {
  const {
    register,
    unregister,
    control,
    trigger,
    formState: { errors },
  } = useFormContext<TemplateFormData>();
  const { fields: metrics } = useFieldArray({
    control,
    name: `metricTypes.${metricTypeIndex}.metrics`,
    keyName: "_id",
  });
  const metric = metrics[index];
  const [isVisible, setIsVisible] = useState(isMetricTypeNew && index === 0);

  const metricNameLive = useWatch({
    name: `metricTypes.${metricTypeIndex}.metrics.${index}.name`,
    control,
  });

  const metricIsManualLive = useWatch({
    name: `metricTypes.${metricTypeIndex}.metrics.${index}.isManual`,
    control,
  });

  const metricIsCalculatedLive = useWatch({
    name: `metricTypes.${metricTypeIndex}.metrics.${index}.isCalculated`,
    control,
  });

  const metricIsSourcedLive = useWatch({
    name: `metricTypes.${metricTypeIndex}.metrics.${index}.isSourced`,
    control,
  });

  useEffect(() => {
    if (metricIsManualLive) {
      register(`metricTypes.${metricTypeIndex}.metrics.${index}.value`);
    } else {
      unregister(`metricTypes.${metricTypeIndex}.metrics.${index}.value`);
    }
    trigger(`metricTypes.${metricTypeIndex}.metrics.${index}.isCalculated`);
    trigger(`metricTypes.${metricTypeIndex}.metrics.${index}.isSourced`);
  }, [
    index,
    metricIsManualLive,
    metricTypeIndex,
    register,
    trigger,
    unregister,
  ]);

  useEffect(() => {
    trigger(`metricTypes.${metricTypeIndex}.metrics.${index}.isManual`);
    trigger(`metricTypes.${metricTypeIndex}.metrics.${index}.isSourced`);
  }, [index, metricIsCalculatedLive, metricTypeIndex, trigger]);

  useEffect(() => {
    trigger(`metricTypes.${metricTypeIndex}.metrics.${index}.isManual`);
    trigger(`metricTypes.${metricTypeIndex}.metrics.${index}.isCalculated`);
  }, [index, metricIsSourcedLive, metricTypeIndex, trigger]);

  const showTrashButton = isMetricTypeNew || !isReadonly;

  return (
    <div className="flex justify-between items-center gap-2 mt-4">
      <details
        className="group rounded-lg bg-white p-6 [&_summary::-webkit-details-marker]:hidden w-full"
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
            {metricNameLive ? metricNameLive : "Untitled Metric"}
          </span>

          <div className="flex gap-5">
            {isVisible ? (
              <ChevronUp height={17} width={17} />
            ) : (
              <ChevronRight height={17} width={17} />
            )}
            {showTrashButton ? (
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
            ) : null}
          </div>
        </summary>
        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`name.${metric?._id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will be the name of your metric.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <input
                id={`name.${metric?._id}`}
                type="text"
                className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
                  !isReadonly &&
                  errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]?.name
                    ? "border-red-600"
                    : ""
                }`}
                {...register(
                  `metricTypes.${metricTypeIndex}.metrics.${index}.name`,
                )}
                disabled={isReadonly}
              />
              {!isReadonly &&
                errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                  ?.name && (
                  <span className="text-xs text-red-600">
                    {
                      errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                        ?.name?.message
                    }
                  </span>
                )}
            </div>
          </div>
        </div>

        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`manual.${metric?._id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Manual
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will mark the metric as a manual value.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Controller
                control={control}
                name={`metricTypes.${metricTypeIndex}.metrics.${index}.isManual`}
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
              {!isReadonly &&
                errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                  ?.isManual && (
                  <span className="text-xs text-red-600">
                    {
                      errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                        ?.isManual?.message
                    }
                  </span>
                )}
            </div>
          </div>
        </div>

        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`value.${metric?._id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Value
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This can be the default value of the metric.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <input
                id={`value.${metric?._id}`}
                type="text"
                className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
                  !isReadonly &&
                  errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]?.value
                    ? "border-red-600"
                    : ""
                }`}
                {...register(
                  `metricTypes.${metricTypeIndex}.metrics.${index}.value`,
                )}
                disabled={isReadonly || !metricIsManualLive}
              />
              {!isReadonly &&
                errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                  ?.value && (
                  <span className="text-xs text-red-600">
                    {
                      errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                        ?.value?.message
                    }
                  </span>
                )}
              {!isReadonly && !metricIsManualLive && (
                <span className="text-xs text-yellow-600">
                  Since this metric is not configured to be a manual metric, any
                  value defined will not be configured.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`calculated.${metric?._id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Calculated
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will mark the metric as a calculated value.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Controller
                control={control}
                name={`metricTypes.${metricTypeIndex}.metrics.${index}.isCalculated`}
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
              {!isReadonly &&
                errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                  ?.isCalculated && (
                  <span className="text-xs text-red-600">
                    {
                      errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                        ?.isCalculated?.message
                    }
                  </span>
                )}
            </div>
          </div>
        </div>

        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col w-96">
              <label
                htmlFor={`sourced.${metric?._id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Sourced
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will mark the metric as a sourced value.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Controller
                control={control}
                name={`metricTypes.${metricTypeIndex}.metrics.${index}.isSourced`}
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
              {!isReadonly &&
                errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                  ?.isSourced && (
                  <span className="text-xs text-red-600">
                    {
                      errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                        ?.isSourced?.message
                    }
                  </span>
                )}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};
