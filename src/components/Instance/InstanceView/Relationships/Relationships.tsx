import { Select } from "@/components/shared";
import { FormLabel } from "@/components/ui/form";
import { InstanceFormData } from "@/models";
import { useRelationships } from "@/service";
import { useFieldArray, useFormContext } from "react-hook-form";

export const Relationships = () => {
  const { control, getValues } = useFormContext<InstanceFormData>();

  const { fields: relationships } = useFieldArray({
    control,
    name: "relationships",
    keyName: "_id",
  });

  const { data: relationshipTemplates } = useRelationships();

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-y-auto h-[calc(100vh-220px)] lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0">
      <div className="space-y-4 w-full">
        {getValues("basicInformation.name")}
        {relationships.map((relationship) => {
          return (
            <div className="flex flex-col m-4" key={relationship.id}>
              <FormLabel className="block font-medium mb-2">
                {
                  relationshipTemplates?.find(
                    (r) => r.id === relationship.relationshipTemplateId
                  )?.name
                }
              </FormLabel>
              <Select
                id={relationship.id}
                widthClassName="w-32"
                data={[
                  {
                    label: relationship.target || "",
                    value: relationship.target || "",
                  },
                ]}
                value={relationship.target}
                isDisabled
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
