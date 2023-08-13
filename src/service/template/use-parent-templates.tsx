import { useQuery } from "@tanstack/react-query";
import { TemplateService } from "./template.service.ts";

export const useParentTemplates = () => {
  return useQuery(["parent-templates"], () => {
    const service = new TemplateService();
    return service.getParentTemplates();
  });
};
