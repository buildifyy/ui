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
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface MetricTypesProps {
  readonly fields?: InstanceMetaDataField[];
}

export const MetricTypes = ({ fields }: MetricTypesProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<InstanceFormData>();

  useEffect(() => {
    if (fields) {
      fields.forEach((field, index) => {
        register(`metricTypes.${index}.id`);
        setValue(`metricTypes.${index}.id`, field.id);

        field.metrics.forEach((metric, metricIndex) => {
          register(`metricTypes.${index}.metrics.${metricIndex}.id`);
          setValue(`metricTypes.${index}.metrics.${metricIndex}.id`, metric.id);

          if (metric.dropdownValues.length === 1) {
            register(`metricTypes.${index}.metrics.${metricIndex}.metricType`);
            setValue(
              `metricTypes.${index}.metrics.${metricIndex}.metricType`,
              metric.dropdownValues[0]
            );
          }

          if (metric.manualValue) {
            register(`metricTypes.${index}.metrics.${metricIndex}.value`);
            setValue(
              `metricTypes.${index}.metrics.${metricIndex}.value`,
              metric.manualValue
            );
          }
        });
      });
    }
  }, [fields, register, setValue]);

  return (
    <div className="flex flex-col my-5 mx-10 border rounded py-5 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <Accordion type="multiple" className="w-full">
        {fields?.map((field, metricTypeIndex) => {
          return (
            <AccordionItem value={field.id} key={field.id}>
              <AccordionTrigger>{field.label}</AccordionTrigger>
              <AccordionContent className="px-2">
                {field.metrics?.map((metric, metricIndex) => {
                  return (
                    <div
                      key={metric.id}
                      className="flex flex-col justify-between py-2"
                    >
                      <FormLabel
                        htmlFor={`metricTypes.${metricTypeIndex}.metrics.${metricIndex}.label`}
                        className="block font-medium"
                      >
                        {metric.label}
                      </FormLabel>
                      <div className="flex gap-2">
                        <Select
                          id={`metricTypes.${metricTypeIndex}.metrics.${metricIndex}.label`}
                          data={metric.dropdownValues?.map(
                            (dropdownValue: string) => {
                              return {
                                label: dropdownValue,
                                value: dropdownValue,
                              };
                            }
                          )}
                          widthClassName="w-52"
                          errorClassName={
                            errors.metricTypes?.[metricTypeIndex]?.metrics?.[
                              metricIndex
                            ]?.metricType
                              ? "border-red-800"
                              : ""
                          }
                          {...register(
                            `metricTypes.${metricTypeIndex}.metrics.${metricIndex}.metricType`
                          )}
                        />
                        {watch(
                          `metricTypes.${metricTypeIndex}.metrics.${metricIndex}.metricType`
                        ) === "Manual" && (
                          <Input
                            type="text"
                            className={`p-2 rounded shadow-sm w-32 mt-2`}
                            {...register(
                              `metricTypes.${metricTypeIndex}.metrics.${metricIndex}.value`
                            )}
                          />
                        )}
                      </div>
                      {errors.metricTypes?.[metricTypeIndex]?.metrics?.[
                        metricIndex
                      ]?.metricType && (
                        <FormDescription className="text-red-800 mt-1">
                          {
                            errors.metricTypes?.[metricTypeIndex]?.metrics?.[
                              metricIndex
                            ]?.metricType?.message
                          }
                        </FormDescription>
                      )}
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
