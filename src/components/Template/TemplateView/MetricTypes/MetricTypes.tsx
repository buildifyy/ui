import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { MetricTypePanel } from "@/components/Template";
import { useMetricTypeDropdown } from "@/service";

export const MetricTypes = () => {
  const { control } = useFormContext<TemplateFormData>();
  const { fields: metricTypes } = useFieldArray({
    control,
    name: "metricTypes",
    keyName: "_id",
  });
  const { data: metricTypeValues } = useMetricTypeDropdown();

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center h-[calc(100vh-220px)] overflow-y-auto">
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
              isReadonly
              dropdownValues={metricTypeValues}
            />
          );
        })}
      </div>
    </div>
  );
};
