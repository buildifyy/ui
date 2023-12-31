import { useQuery } from "@tanstack/react-query";
import { InstanceService } from "@/service";

export const useInstanceCreateForm = (templateId?: string) => {
  return useQuery(
    ["instance", templateId],
    () => {
      const service = new InstanceService();
      return service.getInstanceCreateForm(templateId);
    },
    {
      enabled: !!templateId,
      refetchOnWindowFocus: false,
    }
  );
};
