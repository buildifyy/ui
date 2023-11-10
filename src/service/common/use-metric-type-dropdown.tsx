import { useQuery } from "@tanstack/react-query";
import { CommonService } from "./common.service.ts";

export const useMetricTypeDropdown = () => {
  return useQuery(
    ["metric-types"],
    () => {
      return new CommonService().getMetricTypeDropdown();
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
