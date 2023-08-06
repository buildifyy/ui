import { useFieldArray, useFormContext } from "react-hook-form";
import { CreateTemplateFormData } from "../../../../models";
import { AddPanel, MetricTypePanel } from "../../..";

export const MetricTypes = () => {
  const { control, getValues } = useFormContext<CreateTemplateFormData>();
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

  const handleToggleExpandOrCollapseAll = () => {
    const shouldCollapseAll = metricTypes.some((mt) => mt.isExpanded);
    if (shouldCollapseAll) {
      metricTypes.forEach((_, index) => {
        update(index, {
          ...getValues(`metricTypes.${index}`),
          isExpanded: false,
        });
      });
    } else {
      metricTypes.forEach((_, index) => {
        update(index, {
          ...getValues(`metricTypes.${index}`),
          isExpanded: true,
        });
      });
    }
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto max-h-[35rem]">
      <div className="space-y-4 w-full">
        {metricTypes.length !== 0 ? (
          <div className="flex justify-between">
            <span className="text-green-600">
              {metricTypes.length} new
              {metricTypes.length > 1 ? " metric types" : " metric type"}
            </span>
            <button
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-1 w-fit text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
              type="submit"
              onClick={handleToggleExpandOrCollapseAll}
            >
              {metricTypes.some((mt) => mt.isExpanded)
                ? "Collapse All"
                : "Expand All"}
            </button>
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
