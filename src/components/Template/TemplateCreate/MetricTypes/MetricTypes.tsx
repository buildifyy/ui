import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { AddPanel } from "@/components/shared";
import { MetricTypePanel } from "../../Panels";
import { useMetricTypeDropdown } from "@/service/common";
import { useLocation } from "react-router-dom";

export const MetricTypes = () => {
  const location = useLocation();
  const { control } = useFormContext<TemplateFormData>();
  const {
    fields: metricTypes,
    prepend,
    append,
    remove,
  } = useFieldArray({ control, name: "metricTypes", keyName: "_id" });

  const isEditMode = location.pathname.includes("/edit");

  const { data: metricTypeValues } = useMetricTypeDropdown();

  const handleRemoveMetricType = (index: number) => {
    remove(index);
  };

  const handleAddMetricType = () => {
    if (isEditMode) {
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
          },
        ],
      });
    } else {
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
    }
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)]">
      <div className="space-y-4 w-full overflow-y-auto">
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
