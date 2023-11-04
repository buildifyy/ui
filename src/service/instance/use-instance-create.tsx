import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { InstanceFormData } from "@/models";
import { InstanceService } from ".";

export const useInstanceCreate = (): UseMutationResult<
  unknown,
  unknown,
  InstanceFormData
> => {
  const queryClient = useQueryClient();

  return useMutation((data) => new InstanceService().createInstance(data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["template-list"] });
    },
  });
};
