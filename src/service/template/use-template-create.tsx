import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { TemplateFormData } from "@/models";
import { TemplateService } from "@/service";

export const useTemplateCreate = (): UseMutationResult<
  unknown,
  unknown,
  TemplateFormData
> => {
  const queryClient = useQueryClient();

  return useMutation((data) => new TemplateService().createTemplate(data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["template-list"] });
    },
  });
};
