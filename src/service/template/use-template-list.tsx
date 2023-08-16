import { useQuery } from "@tanstack/react-query";
import { TemplateService } from "@/service";

export const useTemplateList = () => {
  return useQuery(["template-list"], () => {
    const service = new TemplateService();
    return service.getTemplateList();
  });
};
