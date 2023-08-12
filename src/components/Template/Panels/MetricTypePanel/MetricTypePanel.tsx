import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FaChevronUp, FaChevronDown, FaTrashAlt } from "react-icons/fa";
import { TemplateFormData } from "../../../../models";
import { AddPanel, Select, SelectData } from "../../../shared";
import { MetricPanel } from "../MetricPanel";

interface MetricTypePanelProps {
  readonly index: number;
  readonly onRemove?: (index: number) => void;
  readonly onToggleExpand: (index: number) => void;
  readonly isReadonly?: boolean;
}

export const MetricTypePanel = ({
  index,
  onRemove,
  onToggleExpand,
  isReadonly,
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

  const {
    fields: metrics,
    prepend,
    remove,
    update,
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
    prepend({ name: "", isExpanded: true });
  };

  const handleRemoveMetric = (index: number) => {
    remove(index);
  };

  const handleToggleExpandMetric = (metricIndex: number) => {
    update(index, {
      ...getValues(`metricTypes.${index}.metrics.${metricIndex}`),
      isExpanded: !getValues(
        `metricTypes.${index}.metrics.${metricIndex}.isExpanded`,
      ),
    });
  };

  const metricTypeData: SelectData[] = [
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
        open={getValues(`metricTypes.${index}.isExpanded`)}
      >
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
          onClick={() => {
            event?.preventDefault();
            onToggleExpand(index);
          }}
        >
          <span className="font-normal italic text-sm">
            {metricTypeNameLive ? metricTypeNameLive : "Untitled Metric Type"}
          </span>

          <div className="flex gap-5">
            {getValues(`metricTypes.${index}.isExpanded`) ? (
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
                data={metricTypeData}
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
                onToggleExpand={handleToggleExpandMetric}
                isReadonly={isReadonly}
              />
            );
          })}
        </div>
      </details>
    </div>
  );
};
