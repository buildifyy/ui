import { FormLabel } from "@/components/ui/form";
import { InstanceFormData, RelationshipData } from "@/models";
import {
  useApplicableRelationshipInstanceList,
  useRelationships,
} from "@/service";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const Relationships = () => {
  const { control, watch, getValues, setValue, register } =
    useFormContext<InstanceFormData>();
  const { data: relationshipTemplates } = useRelationships();
  const [relationshipTemplatesToRender, setRelationshipTemplatesToRender] =
    useState<RelationshipData[]>([]);

  const basicInformationRootTemplate = useWatch({
    name: "basicInformation.rootTemplate",
    control,
  });

  const basicInformationParent = useWatch({
    name: "basicInformation.parent",
    control,
  });

  const instanceLists = useApplicableRelationshipInstanceList(
    basicInformationParent,
    relationshipTemplatesToRender?.map(
      (relationshipTemplate) => relationshipTemplate.id
    )
  );

  useEffect(() => {
    if (
      relationshipTemplates &&
      basicInformationParent &&
      basicInformationRootTemplate
    ) {
      const relationshipTemplatesToRender = relationshipTemplates?.filter(
        (relationshipTemplate) =>
          basicInformationRootTemplate
            ? relationshipTemplate.source === basicInformationRootTemplate
            : relationshipTemplate.source === basicInformationParent
      );
      setRelationshipTemplatesToRender(relationshipTemplatesToRender);
    }
  }, [
    basicInformationParent,
    basicInformationRootTemplate,
    relationshipTemplates,
  ]);

  useEffect(() => {
    if (relationshipTemplatesToRender) {
      relationshipTemplatesToRender.forEach((relationshipTemplate, i) => {
        register(`relationships.${i}.relationshipTemplateId`);
        setValue(
          `relationships.${i}.relationshipTemplateId`,
          relationshipTemplate.id
        );
      });
    }
  }, [register, relationshipTemplatesToRender, setValue]);

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <div className="space-y-4 w-full">
        {getValues("basicInformation.name")}
        {relationshipTemplatesToRender?.map((relationshipTemplate, i) => {
          return (
            <div className="flex flex-col m-4" key={relationshipTemplate.id}>
              <FormLabel className="block font-medium">
                {relationshipTemplate.name}
              </FormLabel>

              <Select
                variant="bordered"
                placeholder="Select instances"
                labelPlacement="outside"
                selectionMode={
                  relationshipTemplate.cardinality === "one-to-many"
                    ? "multiple"
                    : "single"
                }
                className="max-w-xs mt-3"
                {...register(`relationships.${i}.target`)}
                selectedKeys={
                  typeof watch(`relationships.${i}.target`) === "string" &&
                  watch(`relationships.${i}.target`) !== ""
                    ? new Set(
                        (watch(`relationships.${i}.target`) as string).split(
                          ","
                        )
                      )
                    : ""
                }
              >
                {(instanceLists[i].data ?? []).map(
                  (instance: InstanceFormData) => (
                    <SelectItem
                      key={instance.basicInformation.externalId}
                      value={instance.basicInformation.externalId}
                    >
                      {instance.basicInformation.name}
                    </SelectItem>
                  )
                )}
              </Select>
            </div>
          );
        })}
      </div>
    </div>
  );
};
