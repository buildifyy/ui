import { FormLabel } from "@/components/ui/form";
import { InstanceFormData } from "@/models";
import { useRelationships } from "@/service";
import Graphin, { Behaviors, GraphinData } from "@antv/graphin";
import {
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Eye } from "lucide-react";
import { useState } from "react";
import {
  FieldArrayWithId,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

export const Relationships = () => {
  const { control, getValues } = useFormContext<InstanceFormData>();
  const [graphDataToRender, setGraphDataToRender] = useState<GraphinData>({
    nodes: [],
    edges: [],
  });

  const { fields: relationships } = useFieldArray({
    control,
    name: "relationships",
    keyName: "_id",
  });

  const { data: relationshipTemplates } = useRelationships();

  const handlePopoverClick = (
    relationship: FieldArrayWithId<InstanceFormData, "relationships", "_id">,
    isOpen: boolean
  ) => {
    if (isOpen) {
      const source = getValues("basicInformation.name");
      const targets = Array.isArray(relationship.target)
        ? relationship.target.map((target) => target)
        : [relationship.target];
      const relationshipName = relationshipTemplates?.find(
        (template) => template.id === relationship.relationshipTemplateId
      )?.name;

      const allNodes = [source, ...targets];

      setGraphDataToRender({
        nodes: allNodes.map((node) => {
          return {
            id: node ?? "",
            style: {
              label: {
                value: node ?? "",
              },
            },
          };
        }),
        edges: targets.map((target) => {
          return {
            source: source,
            target: target ?? "",
            style: {
              label: {
                value: relationshipName,
              },
            },
          };
        }),
      });
    }
  };

  const { ZoomCanvas } = Behaviors;

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <div className="space-y-4 w-full">
        {getValues("basicInformation.name")}
        {relationships.map((relationship) => {
          return (
            <div className="flex flex-col m-4" key={relationship.id}>
              <div className="flex gap-3">
                <FormLabel className="block font-medium">
                  {
                    relationshipTemplates?.find(
                      (r) => r.id === relationship.relationshipTemplateId
                    )?.name
                  }
                </FormLabel>
                <Popover
                  showArrow
                  placement="right"
                  onOpenChange={(isOpen: boolean) =>
                    handlePopoverClick(relationship, isOpen)
                  }
                >
                  <PopoverTrigger>
                    <Eye width={17} height={17} />
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Graphin
                      data={graphDataToRender}
                      theme={{
                        mode: "dark",
                        background:
                          "hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))",
                        edgeSize: 2,
                        nodeSize: 30,
                      }}
                      style={{
                        borderRadius: "10px",
                      }}
                    >
                      <ZoomCanvas />
                    </Graphin>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {Array.isArray(relationship.target) ? (
                  relationship.target?.map((target: string) => (
                    <Chip
                      variant="shadow"
                      color="warning"
                      size="sm"
                      key={target}
                    >
                      {target}
                    </Chip>
                  ))
                ) : (
                  <Chip variant="shadow" color="warning" size="sm">
                    {relationship.target}
                  </Chip>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
