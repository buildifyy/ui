import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { AddPanel } from "@/components/shared";
import { MetricTypePanel } from "@/components/Template";
import { useMetricTypeDropdown } from "@/service";

export const MetricTypes = () => {
  const { control } = useFormContext<TemplateFormData>();
  const {
    fields: metricTypes,
    append,
    remove,
  } = useFieldArray({ control, name: "metricTypes", keyName: "_id" });

  const { data: metricTypeValues } = useMetricTypeDropdown();

  const handleRemoveMetricType = (index: number) => {
    remove(index);
  };

  const handleAddMetricType = () => {
    append({
      name: "",
      metricType: "",
      isNew: true,
      metrics: [
        {
          name: "",
          isCalculated: false,
          isManual: false,
          isSourced: false,
          isNew: true,
        },
      ],
    });
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
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
              isNew={mt.isNew}
            />
          );
        })}
      </div>
    </div>
  );
};
