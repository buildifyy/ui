import { Select } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useMetricTypeDropdown, useUnitDropdown } from "@/service";
import React from "react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface MetricProps {
  readonly fields?: InstanceMetaDataField[];
}

export const Metrics = ({ fields }: MetricProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<InstanceFormData>();

  const { data: metricTypeValues } = useMetricTypeDropdown();
  const { data: unitValues } = useUnitDropdown();

  useEffect(() => {
    if (fields) {
      fields.forEach((field, index) => {
        register(`metrics.${index}.id`);
        setValue(`metrics.${index}.id`, field.id);

        if (field.dropdownValues.length === 1) {
          register(`metrics.${index}.metricBehaviour`);
          setValue(`metrics.${index}.metricBehaviour`, field.dropdownValues[0]);
        }

        if (field.manualValue) {
          register(`metrics.${index}.value`);
          setValue(`metrics.${index}.value`, field.manualValue);
        }
      });
    }
  }, [fields, register, setValue]);

  return (
    <div className="flex flex-col my-5 mx-10 border rounded py-5 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <Accordion type="multiple" className="w-full">
        {fields?.map((field, index) => {
          return (
            <AccordionItem value={field.id} key={field.id}>
              <AccordionTrigger>{field.label}</AccordionTrigger>
              <AccordionContent className="px-2">
                <div
                  key={field.id}
                  className="flex flex-col justify-between py-2 mb-2"
                >
                  <FormLabel
                    htmlFor={`metrics.${index}.metricType`}
                    className="block font-medium mb-1"
                  >
                    Metric Type
                  </FormLabel>
                  <div className="flex gap-2">
                    <Select
                      id={`metrics.${index}.metricType`}
                      data={metricTypeValues}
                      widthClassName="w-52"
                      value={field.type}
                      isDisabled
                    />
                  </div>
                </div>
                <div className="flex justify-start gap-2">
                  <div className="flex flex-col mb-2">
                    <FormLabel
                      htmlFor={`attribute.${index}.metricBehaviour`}
                      className="block font-medium mb-1"
                    >
                      Metric Behaviour <span className="text-red-800">*</span>
                    </FormLabel>
                    <Select
                      id={`metrics.${index}.label`}
                      data={field.dropdownValues?.map(
                        (dropdownValue: string) => {
                          return {
                            label: dropdownValue,
                            value: dropdownValue,
                          };
                        }
                      )}
                      widthClassName="w-52"
                      errorClassName={
                        errors?.metrics?.[index]?.metricBehaviour
                          ? "border-red-800"
                          : ""
                      }
                      {...register(`metrics.${index}.metricBehaviour`)}
                    />
                    {errors?.metrics?.[index]?.metricBehaviour && (
                      <FormDescription className="text-red-800 mt-1">
                        {errors?.metrics?.[index]?.metricBehaviour?.message}
                      </FormDescription>
                    )}
                  </div>
                  {watch(`metrics.${index}.metricBehaviour`) === "Manual" && (
                    <React.Fragment>
                      <div className="flex flex-col w-32">
                        <FormLabel>Value</FormLabel>
                        <Input
                          type="text"
                          className={`p-2 rounded shadow-sm w-32 mt-2 ${
                            errors?.metrics?.[index]?.value
                              ? "border-red-800"
                              : ""
                          }`}
                          {...register(`metrics.${index}.value`)}
                          placeholder="Enter Value"
                        />
                        {errors?.metrics?.[index]?.value && (
                          <FormDescription className="text-red-800 mt-1">
                            {errors?.metrics?.[index]?.value?.message}
                          </FormDescription>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <FormLabel>Symbol</FormLabel>
                        <Input
                          type="text"
                          className={`p-2 rounded shadow-sw w-20 mt-2`}
                          value={
                            unitValues?.find(
                              (unit) => unit.value === field.unit
                            )?.symbol
                          }
                          disabled
                        />
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
