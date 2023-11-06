import { Select } from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InstanceFormData, InstanceMetaDataField } from "@/models";
import { useFormContext } from "react-hook-form";

interface MetricTypesProps {
  readonly fields?: InstanceMetaDataField[];
}

export const MetricTypes = ({ fields }: MetricTypesProps) => {
  const { register, getValues } = useFormContext<InstanceFormData>();

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
                          {...register(
                            `metricTypes.${metricTypeIndex}.metrics.${metricIndex}.metricType`
                          )}
                          isDisabled
                        />
                        {getValues(
                          `metricTypes.${metricTypeIndex}.metrics.${metricIndex}.metricType`
                        ) === "Manual" && (
                          <Input
                            type="text"
                            className={`p-2 rounded shadow-sm w-32 mt-2`}
                            {...register(
                              `metricTypes.${metricTypeIndex}.metrics.${metricIndex}.value`
                            )}
                            disabled
                          />
                        )}
                      </div>
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
