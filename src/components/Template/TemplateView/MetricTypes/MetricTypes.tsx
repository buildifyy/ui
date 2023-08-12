import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "../../../../models";
import { MetricTypePanel } from "../../Panels";

export const MetricTypes = () => {
  const { control, getValues } = useFormContext<TemplateFormData>();
  const { fields: metricTypes, update } = useFieldArray({
    control,
    name: "metricTypes",
    keyName: "_id",
  });

  const handleToggleExpandMetricType = (index: number) => {
    update(index, {
      ...getValues(`metricTypes.${index}`),
      isExpanded: !getValues(`metricTypes.${index}.isExpanded`),
    });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[35rem]">
      <div className="space-y-4 w-full">
        {metricTypes.length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {metricTypes.length}
              {metricTypes.length > 1 ? " metric types" : " metric type"}
            </span>
          </div>
        ) : null}

        {metricTypes.length === 0 ? <span>No metric types found</span> : null}

        {metricTypes.map((mt, index) => {
          return (
            <MetricTypePanel
              key={mt._id}
              index={index}
              onToggleExpand={handleToggleExpandMetricType}
              isReadonly
            />
          );
        })}
      </div>
    </div>
  );
};
