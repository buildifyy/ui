import { FormLabel } from "@/components/ui/form";
import { InstanceFormData } from "@/models";
import { useInstanceList, useRelationships } from "@/service";
import Graphin, {
  Behaviors,
  GraphinData,
  IUserEdge,
  IUserNode,
} from "@antv/graphin";
import {
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

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
  const { data: instanceList } = useInstanceList();

  const handlePopoverClick = (isOpen: boolean) => {
    if (isOpen) {
      const sourceRootTemplate = getValues("basicInformation.rootTemplate");
      const source = getValues("basicInformation.externalId");
      const nodes: IUserNode[] = [
        {
          id: source,
          style: {
            label: {
              value: source,
            },
            keyshape: {
              stroke: sourceRootTemplate === "p.com.asset" ? "blue" : "red",
              fill: sourceRootTemplate === "p.com.asset" ? "blue" : "red",
            },
          },
        },
      ];

      const edges: IUserEdge[] = [];

      relationships.forEach((relationship) => {
        const relationshipTemplate = relationshipTemplates?.find(
          (template) => template.id === relationship.relationshipTemplateId
        );
        const relationshipName = relationshipTemplate?.name;

        const targets = Array.isArray(relationship.target)
          ? relationship.target.map((target) => target)
          : [relationship.target ?? ""];

        nodes.push(
          ...targets.map((target) => {
            const instance = instanceList?.find(
              (instance) => instance.basicInformation.externalId === target
            );
            return {
              id: target,
              style: {
                label: {
                  value: target,
                },
                keyshape: {
                  stroke:
                    instance?.basicInformation.rootTemplate === "p.com.asset"
                      ? "blue"
                      : "red",
                  fill:
                    instance?.basicInformation.rootTemplate === "p.com.asset"
                      ? "blue"
                      : "red",
                },
              },
            };
          })
        );

        edges.push(
          ...targets.map((target) => {
            return {
              source: source,
              target: target,
              style: {
                label: {
                  value: relationshipName,
                },
              },
            };
          })
        );
      });

      setGraphDataToRender({
        nodes,
        edges,
      });
    }
  };

  const { ZoomCanvas } = Behaviors;

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <div className="space-y-4 w-full">
        <div className="flex gap-3 items-center">
          <span>{getValues("basicInformation.name")}</span>
          <Popover
            showArrow
            placement="right"
            onOpenChange={handlePopoverClick}
            backdrop="blur"
          >
            <PopoverTrigger>
              <Eye width={17} height={17} className="hover:cursor-pointer" />
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
        {relationships.map((relationship) => {
          return (
            <div className="flex flex-col m-4" key={relationship.id}>
              <FormLabel className="block font-medium">
                {
                  relationshipTemplates?.find(
                    (r) => r.id === relationship.relationshipTemplateId
                  )?.name
                }
              </FormLabel>

              <div className="flex flex-wrap gap-2 mt-3">
                {Array.isArray(relationship.target) ? (
                  relationship.target?.map((target: string) => {
                    const instance = instanceList?.find(
                      (instance) =>
                        instance.basicInformation.externalId === target
                    );
                    return (
                      <Chip
                        variant="shadow"
                        color={
                          instance?.basicInformation.rootTemplate ===
                          "p.com.asset"
                            ? "default"
                            : "warning"
                        }
                        size="sm"
                        key={target}
                      >
                        {target}
                      </Chip>
                    );
                  })
                ) : (
                  <Chip
                    variant="shadow"
                    color={
                      instanceList?.find(
                        (instance) =>
                          instance.basicInformation.externalId ===
                          relationship.target
                      )?.basicInformation.rootTemplate === "p.com.asset"
                        ? "default"
                        : "warning"
                    }
                    size="sm"
                  >
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
