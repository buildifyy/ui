import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { AddPanel } from "@/components/shared";
import { MetricTypePanel } from "../../Panels";
import { useMetricTypeDropdown } from "@/service/common";

export const MetricTypes = () => {
  const { control } = useFormContext<TemplateFormData>();
  const {
    fields: metricTypes,
    prepend,
    remove,
  } = useFieldArray({ control, name: "metricTypes", keyName: "_id" });

  const { data: metricTypeValues } = useMetricTypeDropdown();

  const handleRemoveMetricType = (index: number) => {
    remove(index);
  };

  const handleAddMetricType = () => {
    prepend({
      name: "",
      metricType: "",
      isNew: true,
      metrics: [
        {
          name: "",
          isCalculated: false,
          isManual: false,
          isSourced: false,
        },
      ],
    });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[28rem]">
      <div className="space-y-4 w-full">
        {metricTypes.filter((mt) => mt.isNew).length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {metricTypes.filter((mt) => mt.isNew).length} custom
              {metricTypes.filter((mt) => mt.isNew).length > 1
                ? " metric types"
                : " metric type"}
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
              dropdownValues={metricTypeValues}
            />
          );
        })}
      </div>
    </div>
  );
};
