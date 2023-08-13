import { useQuery } from "@tanstack/react-query";
import { CommonService } from "./common.service.ts";

export const useAttributeTypeDropdown = () => {
  return useQuery(["attribute-types"], () => {
    return new CommonService().getAttributeTypeDropdown();
  });
};
