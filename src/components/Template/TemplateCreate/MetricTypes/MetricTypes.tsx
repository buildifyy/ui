import { useFieldArray, useFormContext } from "react-hook-form";
import { CreateTemplateFormData } from "../../../../models";
import { AddPanel, MetricTypePanel } from "../../..";

export const MetricTypes = () => {
  const { control } = useFormContext<CreateTemplateFormData>();
  const {
    fields: metricTypes,
    prepend,
    remove,
  } = useFieldArray({ control, name: "metricTypes", keyName: "_id" });

  const handleRemoveMetricType = (index: number) => {
    remove(index);
  };

  const handleAddMetricType = () => {
    prepend({ name: "", metricType: "", metrics: [] });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-scroll h-[30rem]">
      <div className="space-y-4 w-full">
        {metricTypes.length !== 0 ? (
          <span>
            {metricTypes.length} new
            {metricTypes.length > 1 ? " metric types" : " metric type"}
          </span>
        ) : null}

        <AddPanel title="Add Metric Type" onAdd={handleAddMetricType} />
        {metricTypes.map((mt, index) => {
          return (
            <MetricTypePanel
              key={mt._id}
              index={index}
              onRemove={handleRemoveMetricType}
            />
          );
        })}
      </div>
    </div>
  );
};
