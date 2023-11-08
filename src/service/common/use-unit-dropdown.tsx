import { useQuery } from "@tanstack/react-query";
import { CommonService } from "./common.service.ts";

export const useUnitDropdown = () => {
  return useQuery(["units"], () => {
    return new CommonService().getUnitDropdown();
  });
};
