import { useQuery } from "@tanstack/react-query";
import { InstanceService } from ".";

export const useInstanceList = () => {
  return useQuery(
    ["instance-list"],
    () => {
      const service = new InstanceService();
      return service.getInstanceList();
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
