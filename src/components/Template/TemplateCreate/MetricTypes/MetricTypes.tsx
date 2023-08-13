import { useFieldArray, useFormContext } from "react-hook-form";
import { Dropdown, TemplateFormData } from "../../../../models";
import { AddPanel } from "../../../shared";
import { MetricTypePanel } from "../../Panels";
import { useEffect, useState } from "react";

interface MetricTypesProps {
  readonly dropdownValues?: Dropdown[];
}

export const MetricTypes = ({ dropdownValues }: MetricTypesProps) => {
  const [metricTypesExpansionState, setMetricTypesExpansionState] =
    useState<Record<number, boolean>>();
  const { control } = useFormContext<TemplateFormData>();
  const {
    fields: metricTypes,
    prepend,
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

  useEffect(() => {
    if (metricTypes) {
      if (metricTypes.length === 1) {
        setMetricTypesExpansionState({ [0]: true });
      } else {
        metricTypes.map((_, index) =>
          setMetricTypesExpansionState((prev) => {
            return {
              ...prev,
              [index]: false,
            };
          }),
        );
      }
    }
  }, [metricTypes]);

  const handleToggleExpandMetricType = (index: number) => {
    const newState = { ...metricTypesExpansionState };
    newState[index] = !newState[index];
    setMetricTypesExpansionState(newState);
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
              dropdownValues={dropdownValues}
              expansionState={metricTypesExpansionState}
            />
          );
        })}
      </div>
    </div>
  );
};
