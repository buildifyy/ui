import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { DropdownData, TemplateFormData } from "@/models";
import { OnOff, Select } from "@/components/shared";
import { useEffect, useState } from "react";
import { ChevronRight, ChevronUp, Trash } from "lucide-react";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface MetricPanelProps {
  readonly index: number;
  readonly onRemove?: (index: number) => void;
  readonly isReadonly?: boolean;
  readonly dropdownValues?: DropdownData[];
  readonly isNew?: boolean;
}

export const MetricPanel = ({
  index,
  onRemove,
  isReadonly,
  dropdownValues,
  isNew,
}: MetricPanelProps) => {
  const {
    register,
    control,
    unregister,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<TemplateFormData>();
  const { fields: metrics } = useFieldArray({
    control,
    name: `metrics`,
    keyName: "_id",
  });
  const metric = metrics[index];
  const [isVisible, setIsVisible] = useState(
    metric?.isNew && (index === 0 || index === metrics.length - 1)
  );

  const metricNameLive = useWatch({
    name: `metrics.${index}.name`,
    control,
  });

  const metricIsManualLive = useWatch({
    name: `metrics.${index}.isManual`,
    control,
  });

  const metricIsCalculatedLive = useWatch({
    name: `metrics.${index}.isCalculated`,
    control,
  });

  const metricIsSourcedLive = useWatch({
    name: `metrics.${index}.isSourced`,
    control,
  });

  const showTrashButton =
    isNew ||
    (metric?.owningTemplate === getValues("basicInformation.externalId") &&
      !isReadonly);

  useEffect(() => {
    if (metricIsManualLive) {
      register(`metrics.${index}.value`);
    } else {
      unregister(`metrics.${index}.value`);
    }
    trigger(`metrics.${index}.isCalculated`);
    trigger(`metrics.${index}.isSourced`);
  }, [index, metricIsManualLive, register, trigger, unregister]);

  useEffect(() => {
    trigger(`metrics.${index}.isManual`);
    trigger(`metrics.${index}.isSourced`);
  }, [index, metricIsCalculatedLive, trigger]);

  useEffect(() => {
    trigger(`metrics.${index}.isManual`);
    trigger(`metrics.${index}.isCalculated`);
  }, [index, metricIsSourcedLive, trigger]);

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
            {metricNameLive ? metricNameLive : "Untitled Metric"}
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
                  htmlFor={`name.${metric?._id}`}
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
                  id={`name.${metric?._id}`}
                  type="text"
                  className={`w-64 p-2 rounded shadow-sm ${
                    !isReadonly && errors.metrics?.[index]?.name
                      ? "border-red-800"
                      : ""
                  }`}
                  {...register(`metrics.${index}.name`)}
                  disabled={isReadonly}
                />
                {!isReadonly && errors.metrics?.[index]?.name && (
                  <FormDescription className="text-red-800">
                    {errors?.metrics?.[index]?.name?.message}
                  </FormDescription>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 leading-relaxed">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col w-96">
                <FormLabel
                  htmlFor={`metricType.${metric?._id}`}
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
                  id={`metricType.${metric?._id}`}
                  widthClassName="w-64"
                  data={dropdownValues}
                  {...register(`metrics.${index}.metricType`)}
                  errorClassName={
                    !isReadonly && errors.metrics?.[index]?.metricType
                      ? "border-red-800"
                      : ""
                  }
                  isDisabled={isReadonly}
                />
                {!isReadonly && errors.metrics?.[index]?.metricType && (
                  <FormDescription className="text-red-800 mt-1">
                    {errors?.metrics?.[index]?.metricType?.message}
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
                  name={`metrics.${index}.isManual`}
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
                {!isReadonly && errors.metrics?.[index]?.isManual && (
                  <FormDescription className="mt-1 text-red-800">
                    {errors?.metrics?.[index]?.isManual?.message}
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
                    !isReadonly && errors?.metrics?.[index]?.value
                      ? "border-red-800"
                      : ""
                  }`}
                  {...register(`metrics.${index}.value`)}
                  disabled={isReadonly || !metricIsManualLive}
                />
                {!isReadonly && errors?.metrics?.[index]?.value && (
                  <FormDescription className="mt-1 text-red-800">
                    {errors?.metrics?.[index]?.value?.message}
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
                  name={`metrics.${index}.isCalculated`}
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
                {!isReadonly && errors?.metrics?.[index]?.isCalculated && (
                  <FormDescription className="mt-1 text-red-800">
                    {errors?.metrics?.[index]?.isCalculated?.message}
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
                  name={`metrics.${index}.isSourced`}
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
                {!isReadonly && errors?.metrics?.[index]?.isSourced && (
                  <FormDescription className="mt-1 text-red-800">
                    {errors?.metrics?.[index]?.isSourced?.message}
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
