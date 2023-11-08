import { useFieldArray, useFormContext } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { MetricPanel } from "@/components/Template";
import { useMetricTypeDropdown } from "@/service";

export const Metrics = () => {
  const { control } = useFormContext<TemplateFormData>();
  const { fields: metrics } = useFieldArray({
    control,
    name: "metrics",
    keyName: "_id",
  });
  const { data: metricTypeValues } = useMetricTypeDropdown();

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center h-[calc(100vh-220px)] overflow-y-auto lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <div className="space-y-4 w-full">
        {metrics.length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {metrics.length}
              {metrics.length > 1 ? " metrics" : " metric"}
            </span>
          </div>
        ) : null}

        {metrics.length === 0 ? <span>No metrics found</span> : null}

        {metrics.map((mt, index) => {
          return (
            <MetricPanel
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
