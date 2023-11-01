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
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
        <div className="p-2">
          <div className="mt-4 leading-relaxed">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col w-96">
                <FormLabel
                  htmlFor={`name.${metric?._id}`}
                  className="block font-medium"
                >
                  Name
                </FormLabel>
                <FormDescription className="mt-1">
                  This will be the name of your metric.
                </FormDescription>
              </div>
              <div className="flex flex-col items-end">
                <Input
                  id={`name.${metric?._id}`}
                  type="text"
                  className={`w-64 p-2 rounded shadow-sm ${
                    !isReadonly &&
                    errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                      ?.name
                      ? "border-red-800"
                      : ""
                  }`}
                  {...register(
                    `metricTypes.${metricTypeIndex}.metrics.${index}.name`
                  )}
                  disabled={isReadonly}
                />
                {!isReadonly &&
                  errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                    ?.name && (
                    <FormDescription className="mt-1 text-red-800">
                      {
                        errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                          ?.name?.message
                      }
                    </FormDescription>
                  )}
              </div>
            </div>
          </div>
          <div className="mt-4 leading-relaxed">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col w-96">
                <FormLabel
                  htmlFor={`manual.${metric?._id}`}
                  className="block font-medium"
                >
                  Manual
                </FormLabel>
                <FormDescription className="mt-1">
                  This will mark the metric as a manual value.
                </FormDescription>
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
                    <FormDescription className="mt-1 text-red-800">
                      {
                        errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                          ?.isManual?.message
                      }
                    </FormDescription>
                  )}
              </div>
            </div>
          </div>
          <div className="mt-4 leading-relaxed">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col w-96">
                <FormLabel
                  htmlFor={`value.${metric?._id}`}
                  className="block font-medium"
                >
                  Value
                </FormLabel>
                <FormDescription className="mt-1">
                  This can be the default value of the metric.
                </FormDescription>
              </div>
              <div className="flex flex-col items-end">
                <Input
                  id={`value.${metric?._id}`}
                  type="text"
                  className={`w-64 p-2 rounded shadow-sm ${
                    !isReadonly &&
                    errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                      ?.value
                      ? "border-red-800"
                      : ""
                  }`}
                  {...register(
                    `metricTypes.${metricTypeIndex}.metrics.${index}.value`
                  )}
                  disabled={isReadonly || !metricIsManualLive}
                />
                {!isReadonly &&
                  errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                    ?.value && (
                    <FormDescription className="mt-1 text-red-800">
                      {
                        errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                          ?.value?.message
                      }
                    </FormDescription>
                  )}
                {!isReadonly && !metricIsManualLive && (
                  <FormDescription className="mt-1 text-yellow-800">
                    Since this metric is not configured to be a manual metric,
                    any value defined will not be configured.
                  </FormDescription>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 leading-relaxed">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col w-96">
                <FormLabel
                  htmlFor={`calculated.${metric?._id}`}
                  className="block font-medium"
                >
                  Calculated
                </FormLabel>
                <FormDescription className="mt-1">
                  This will mark the metric as a calculated value.
                </FormDescription>
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
                    <FormDescription className="mt-1 text-red-800">
                      {
                        errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                          ?.isCalculated?.message
                      }
                    </FormDescription>
                  )}
              </div>
            </div>
          </div>
          <div className="mt-4 leading-relaxed">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col w-96">
                <FormLabel
                  htmlFor={`sourced.${metric?._id}`}
                  className="block font-medium"
                >
                  Sourced
                </FormLabel>
                <FormDescription className="mt-1">
                  This will mark the metric as a sourced value.
                </FormDescription>
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
                    <FormDescription className="mt-1 text-red-800">
                      {
                        errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                          ?.isSourced?.message
                      }
                    </FormDescription>
                  )}
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};
