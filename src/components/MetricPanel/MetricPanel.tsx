import { useState, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FaChevronUp, FaChevronDown, FaTrashAlt } from "react-icons/fa";
import { Toggle } from "..";
import { CreateTemplateFormData } from "../../models";

interface MetricPanelProps {
  readonly index: number;
  readonly metricTypeIndex: number;
  readonly onRemove: (index: number) => void;
}

export const MetricPanel = ({
  index,
  metricTypeIndex,
  onRemove,
}: MetricPanelProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const {
    register,
    control,
    trigger,
    formState: { errors },
  } = useFormContext<CreateTemplateFormData>();

  const metricNameLive = useWatch({
    name: `metricTypes.${metricTypeIndex}.metrics.${index}.name`,
    control,
  });

  useEffect(() => {
    trigger(`metricTypes.${metricTypeIndex}.metrics.${index}`);
  }, [index, metricTypeIndex, trigger]);

  return (
    <div className="flex justify-between items-center gap-2 mt-4">
      <details
        className="group rounded-lg bg-white p-6 [&_summary::-webkit-details-marker]:hidden w-full"
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
            {metricNameLive ? metricNameLive : "Unititled Metric"}
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
                This will be the name of your metric.
              </span>
            </div>
            <div className="flex flex-col">
              <input
                id="name"
                type="text"
                className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
                  errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]?.name
                    ? "border-red-600"
                    : ""
                }`}
                {...register(
                  `metricTypes.${metricTypeIndex}.metrics.${index}.name`
                )}
              />
              {errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
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
                htmlFor="manual"
                className="block text-sm font-medium text-gray-700"
              >
                Manual
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will mark the metric as a manual value.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Toggle
                id="manual"
                {...register(
                  `metricTypes.${metricTypeIndex}.metrics.${index}.isManual`
                )}
              />
              {errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
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
                htmlFor="value"
                className="block text-sm font-medium text-gray-700"
              >
                Value
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This can be the default value of the metric.
              </span>
            </div>
            <div className="flex flex-col">
              <input
                id="value"
                type="text"
                className={`w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700 ${
                  errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]?.value
                    ? "border-red-600"
                    : ""
                }`}
                {...register(
                  `metricTypes.${metricTypeIndex}.metrics.${index}.value`
                )}
              />
              {errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                ?.value && (
                <span className="text-xs text-red-600">
                  {
                    errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
                      ?.value?.message
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
                htmlFor="calculated"
                className="block text-sm font-medium text-gray-700"
              >
                Calculated
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will mark the metric as a calculated value.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Toggle
                id="calculated"
                {...register(
                  `metricTypes.${metricTypeIndex}.metrics.${index}.isCalculated`
                )}
              />
              {errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
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
                htmlFor="sourced"
                className="block text-sm font-medium text-gray-700"
              >
                Sourced
              </label>
              <span className="text-xs text-gray-400 mt-2">
                This will mark the metric as a sourced value.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <Toggle
                id="sourced"
                {...register(
                  `metricTypes.${metricTypeIndex}.metrics.${index}.isSourced`
                )}
              />
              {errors.metricTypes?.[metricTypeIndex]?.metrics?.[index]
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
