import { useQuery } from "@tanstack/react-query";
import { TemplateService } from "@/service";

export const useParentTemplates = () => {
  return useQuery(
    ["parent-templates"],
    () => {
      const service = new TemplateService();
      return service.getParentTemplates();
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
