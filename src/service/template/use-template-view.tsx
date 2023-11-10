import { useQuery } from "@tanstack/react-query";
import { TemplateService } from "@/service";

export const useTemplateView = (templateId?: string) => {
  return useQuery(
    ["template", templateId],
    () => {
      const service = new TemplateService();
      return service.getTemplate(templateId);
    },
    {
      enabled: !!templateId,
      refetchOnWindowFocus: false,
    }
  );
};
