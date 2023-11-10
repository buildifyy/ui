import { useQuery } from "@tanstack/react-query";
import { CommonService } from "./common.service.ts";

export const useRelationships = () => {
  return useQuery(
    ["relationships"],
    () => {
      return new CommonService().getRelationships();
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
