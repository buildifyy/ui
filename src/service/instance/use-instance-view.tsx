import { useQuery } from "@tanstack/react-query";
import { InstanceService } from ".";

export const useInstanceView = (instanceId?: string) => {
  return useQuery(
    ["instance", instanceId],
    () => {
      const service = new InstanceService();
      return service.getInstance(instanceId);
    },
    {
      enabled: !!instanceId,
      refetchOnWindowFocus: false,
    }
  );
};
