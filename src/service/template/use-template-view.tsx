import { useQuery } from "@tanstack/react-query";
import { TemplateService } from "./template.service.ts";

export const useTemplateView = (templateId?: string) => {
  return useQuery(
    ["template", templateId],
    () => {
      const service = new TemplateService();
      return service.getTemplate(templateId);
    },
    {
      enabled: !!templateId,
    },
  );
};
