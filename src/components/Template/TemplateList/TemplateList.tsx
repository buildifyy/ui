import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { CreateTemplateFormData } from "../../../models";
import { DataTable } from "../../DataTable/DataTable";
import { FaBan, FaCheck } from "react-icons/fa";

export const TemplateList = () => {
  const localData = localStorage.getItem("template");
  const jsonData = localData ? JSON.parse(localData) : {};

  console.log("jsonData: ", jsonData);

  const columnHelper = createColumnHelper<CreateTemplateFormData>();

  const columns = [
    columnHelper.accessor("basicInformation.name", {
      id: "name",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span className="font-bold">Name</span>,
    }),
    columnHelper.accessor("basicInformation.externalId", {
      id: "externalId",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span className="font-bold">External ID</span>,
    }),
    columnHelper.accessor("basicInformation.parent", {
      id: "parent",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <div className="flex font-bold">Parent</div>,
    }),
    columnHelper.accessor("basicInformation.isCustom", {
      id: "isCustom",
      cell: (info) => {
        return (
          <div className="flex justify-center">
            {info.getValue() ? <FaCheck /> : <FaBan />}
          </div>
        );
      },
      header: () => <div className="flex justify-center font-bold">Custom</div>,
    }),
  ];

  const [data] = React.useState(() => [jsonData]);

  return (
    <div className="p-2 w-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
