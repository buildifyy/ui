import { FormLabel } from "@/components/ui/form";
import { InstanceFormData, RelationshipData } from "@/models";
import { useInstanceList, useRelationships } from "@/service";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const Relationships = () => {
  const { control, watch, getValues, setValue, register } =
    useFormContext<InstanceFormData>();
  const { data: relationshipTemplates } = useRelationships();
  const { data: instanceList } = useInstanceList();

  const basicInformationRootTemplate = useWatch({
    name: "basicInformation.rootTemplate",
    control,
  });

  const basicInformationParent = useWatch({
    name: "basicInformation.parent",
    control,
  });

  console.log("keys: ", watch("relationships.0.target"));

  const relationshipTemplatesToRender = relationshipTemplates?.filter(
    (relationshipTemplate) =>
      basicInformationRootTemplate
        ? relationshipTemplate.source === basicInformationRootTemplate
        : relationshipTemplate.source === basicInformationParent
  );

  const getInstanceListToRender = (
    relationshipTemplate: RelationshipData
  ): InstanceFormData[] => {
    if (instanceList) {
      const instancesThatMatchTargetType = instanceList.filter((instance) => {
        // need instances that match the target type of the relationship being created
        return (
          instance.basicInformation.rootTemplate &&
          relationshipTemplate.target.includes(
            instance.basicInformation.rootTemplate
          )
        );
      });

      if (
        basicInformationRootTemplate === "p.com.asset" ||
        basicInformationParent === "p.com.asset"
      ) {
        return instancesThatMatchTargetType;
      }

      return instancesThatMatchTargetType.filter((instance) => {
        // need instances that either do not have any relationships or do not possess the is located in relationship (inverse)
        return (
          instance.relationships?.findIndex(
            (rel) => rel.relationshipTemplateId === relationshipTemplate.inverse
          ) === -1 || !instance.relationships
        );
      });
    }
    return [];
  };

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
                {getInstanceListToRender(relationshipTemplate).map(
                  (instance) => (
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
