import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { AddPanel } from "@/components/shared";
import { MetricPanel } from "@/components/Template";
import { useMetricTypeDropdown, useUnitDropdown } from "@/service";

export const Metrics = () => {
  const { control } = useFormContext<TemplateFormData>();
  const {
    fields: metrics,
    append,
    remove,
  } = useFieldArray({ control, name: "metrics", keyName: "_id" });

  const { data: metricTypeValues } = useMetricTypeDropdown();
  const { data: unitValues } = useUnitDropdown();

  const handleRemoveMetric = (index: number) => {
    remove(index);
  };

  const handleAddMetric = () => {
    append({
      name: "",
      metricType: "",
      unit: "",
      isCalculated: false,
      isManual: false,
      isSourced: false,
      isNew: true,
    });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <div className="space-y-4 w-full">
        {metrics.filter((metric) => metric.isNew).length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {metrics.filter((metric) => metric.isNew).length} custom
              {metrics.filter((metric) => metric.isNew).length > 1
                ? " metrics"
                : " metric"}
            </span>
          </div>
        ) : null}

        <AddPanel title="Add Metric" onAdd={handleAddMetric} />
        {metrics.map((metric, index) => {
          return (
            <MetricPanel
              key={metric._id}
              index={index}
              onRemove={handleRemoveMetric}
              metricTypeDropdownValues={metricTypeValues}
              unitDropdownValues={unitValues}
              isNew={metric.isNew}
            />
          );
        })}
        {metrics.length > 0 && (
          <AddPanel title="Add Metric" onAdd={handleAddMetric} />
        )}
      </div>
    </div>
  );
};
