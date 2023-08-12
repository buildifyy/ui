import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "../../../../models";
import { AddPanel } from "../../../shared";
import { MetricTypePanel } from "../../Panels";

export const MetricTypes = () => {
  const { control, getValues } = useFormContext<TemplateFormData>();
  const {
    fields: metricTypes,
    prepend,
    update,
    remove,
  } = useFieldArray({ control, name: "metricTypes", keyName: "_id" });

  const handleRemoveMetricType = (index: number) => {
    remove(index);
  };

  const handleAddMetricType = () => {
    prepend({
      name: "",
      metricType: "",
      metrics: [{ name: "", isExpanded: true }],
      isExpanded: true,
    });
  };

  const handleToggleExpandMetricType = (index: number) => {
    update(index, {
      ...getValues(`metricTypes.${index}`),
      isExpanded: !getValues(`metricTypes.${index}.isExpanded`),
    });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[30rem]">
      <div className="space-y-4 w-full">
        {metricTypes.length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {metricTypes.length} new
              {metricTypes.length > 1 ? " metric types" : " metric type"}
            </span>
          </div>
        ) : null}

        <AddPanel title="Add Metric Type" onAdd={handleAddMetricType} />
        {metricTypes.map((mt, index) => {
          return (
            <MetricTypePanel
              key={mt._id}
              index={index}
              onRemove={handleRemoveMetricType}
              onToggleExpand={handleToggleExpandMetricType}
            />
          );
        })}
      </div>
    </div>
  );
};
