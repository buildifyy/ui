import { useQueries } from "@tanstack/react-query";
import { InstanceService } from ".";

export const useApplicableRelationshipInstanceList = (
  parentTemplate?: string,
  relationshipTemplateIds?: string[]
) => {
  const instanceService = new InstanceService();
  const queryObjects = relationshipTemplateIds?.map(
    (relationshipTemplateId) => {
      return {
        queryKey: ["applicable-relationship-instances", relationshipTemplateId],
        queryFn: () =>
          instanceService.getApplicableRelationshipInstances(
            parentTemplate,
            relationshipTemplateId
          ),
        enabled: !!parentTemplate && !!relationshipTemplateId,
      };
    }
  );

  return useQueries({
    queries: queryObjects || [],
  });
};
