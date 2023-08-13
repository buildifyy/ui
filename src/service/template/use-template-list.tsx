import { useQuery } from "@tanstack/react-query";
import { TemplateService } from "./template.service.ts";

export const useTemplateList = () => {
  return useQuery(["template-list"], () => {
    const service = new TemplateService();
    return service.getTemplateList();
  });
};
