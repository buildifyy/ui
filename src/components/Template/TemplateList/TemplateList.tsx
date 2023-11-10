import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TemplateFormData } from "@/models";
import { Header } from "@/components/shared";
import { useTemplateList } from "@/service";
import { FilterX } from "lucide-react";
import {
  Progress,
  Select,
  SelectItem,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { TemplateMoreOptions } from "..";

export const TemplateList = () => {
  const [dataToRender, setDataToRender] = useState<TemplateFormData[]>([]);
  const [searchText, setSearchText] = useState<string>();
  const [selectedExternalIds, setSelectedExternalIds] = useState(
    new Set<string>([])
  );
  const [selectedNames, setSelectedNames] = useState(new Set<string>([]));
  const [selectedParents, setSelectedParents] = useState(new Set<string>([]));
  const cachedList = useRef<TemplateFormData[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(false);
  const { data: templateList, isLoading } = useTemplateList();

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (templateList) {
      cachedList.current = templateList;
      setDataToRender(templateList);
    }
  }, [templateList]);

  useEffect(() => {
    if (
      selectedExternalIds.size === 0 &&
      selectedNames.size === 0 &&
      selectedParents.size === 0
    ) {
      setDataToRender(cachedList.current);
    }
  }, [selectedExternalIds, selectedNames, selectedParents]);

  const handleApplyFilter = () => {
    setIsLoadingFilters(true);

    const getFilteredResults = setTimeout(() => {
      let filteredList = cachedList.current;
      if (searchText) {
        const listCopy = [...cachedList.current];
        filteredList = listCopy.filter((i) =>
          i.basicInformation.name
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      }

      if (selectedExternalIds && selectedExternalIds.size > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i) =>
          selectedExternalIds.has(i.basicInformation.externalId)
        );
      }

      if (selectedNames && selectedNames.size > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i) =>
          selectedNames.has(i.basicInformation.name)
        );
      }

      if (selectedParents && selectedParents.size > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i) =>
          selectedParents.has(i.basicInformation.parent)
        );
      }

      if (
        searchText === "" &&
        selectedExternalIds?.size === 0 &&
        selectedNames?.size === 0 &&
        selectedParents?.size === 0
      ) {
        filteredList = cachedList.current;
      }

      setDataToRender(filteredList);
      setIsLoadingFilters(false);
    }, 1000);

    return () => clearTimeout(getFilteredResults);
  };

  useEffect(() => {
    setIsLoadingFilters(true);
    const getFilteredResults = setTimeout(() => {
      let filteredList = cachedList.current;

      if (selectedExternalIds && selectedExternalIds.size > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i) =>
          selectedExternalIds.has(i.basicInformation.externalId)
        );
      }

      if (selectedNames && selectedNames.size > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i) =>
          selectedNames.has(i.basicInformation.name)
        );
      }

      if (selectedParents && selectedParents.size > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i) =>
          selectedParents.has(i.basicInformation.parent)
        );
      }

      if (searchText) {
        const listCopy = [...cachedList.current];
        filteredList = listCopy.filter(
          (i) =>
            i.basicInformation.externalId
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            i.basicInformation.name
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            i.basicInformation.parent
              .toLowerCase()
              .includes(searchText.toLowerCase())
        );
      }

      if (
        searchText === "" &&
        selectedExternalIds?.size === 0 &&
        selectedNames?.size === 0 &&
        selectedParents?.size === 0
      ) {
        filteredList = cachedList.current;
      }

      setDataToRender(filteredList);
      setIsLoadingFilters(false);
    }, 1000);

    return () => clearTimeout(getFilteredResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleClearAllFilters = () => {
    setSelectedExternalIds(new Set<string>([]));
    setSelectedNames(new Set<string>([]));
    setSelectedParents(new Set<string>([]));
    setSearchText("");
  };

  const tableColumns = [
    {
      key: "externalId",
      label: "EXTERNAL ID",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "parent",
      label: "PARENT",
    },
    {
      key: "custom",
      label: "CUSTOM",
    },
    {
      key: "more",
      label: "",
    },
  ];

  const tableRows = dataToRender.map((data) => {
    return {
      key: data.basicInformation.externalId,
      externalId: data.basicInformation.externalId,
      name: data.basicInformation.name,
      parent: data.basicInformation.parent,
      custom: data.basicInformation.isCustom ? (
        <Chip color="success" variant="bordered" size="sm">
          Custom
        </Chip>
      ) : (
        <Tooltip content="Out-of-the-box">
          <Chip color="warning" variant="bordered" size="sm">
            OOTB
          </Chip>
        </Tooltip>
      ),
      more: (
        <div className="flex gap-2">
          <TemplateMoreOptions
            externalId={data.basicInformation.externalId}
            message="View Options"
          />
          {data.basicInformation.isCustom && (
            <TemplateMoreOptions
              externalId={data.basicInformation.externalId}
              message="Edit Options"
              isEdit
            />
          )}
        </div>
      ),
    };
  });

  return (
    <div className="w-full">
      <Header value="Templates" isListView />
      <div className="flex justify-between mt-4 lg:mx-[10%]">
        <div className="pr-2 flex gap-2 items-center">
          <Select
            selectionMode="multiple"
            labelPlacement="outside"
            placeholder="All External IDs"
            aria-label="All External IDs"
            className="w-40"
            variant="bordered"
            onClose={handleApplyFilter}
            isDisabled={dataToRender.length === 0}
            selectedKeys={selectedExternalIds}
            onChange={(e) => {
              e.target.value === ""
                ? setSelectedExternalIds(new Set())
                : setSelectedExternalIds(new Set(e.target.value.split(",")));
            }}
          >
            {dataToRender.map((data) => (
              <SelectItem
                key={data.basicInformation.externalId}
                value={data.basicInformation.externalId}
              >
                {data.basicInformation.externalId}
              </SelectItem>
            ))}
          </Select>
          <Select
            selectionMode="multiple"
            labelPlacement="outside"
            placeholder="All Names"
            aria-label="All Names"
            className="w-40"
            variant="bordered"
            onClose={handleApplyFilter}
            selectedKeys={selectedNames}
            isDisabled={dataToRender.length === 0}
            onChange={(e) => {
              e.target.value === ""
                ? setSelectedNames(new Set())
                : setSelectedNames(new Set(e.target.value.split(",")));
            }}
          >
            {[
              ...new Set(
                dataToRender.map((data) => data.basicInformation.name)
              ),
            ].map((data) => (
              <SelectItem key={data} value={data}>
                {data}
              </SelectItem>
            ))}
          </Select>
          <Select
            selectionMode="multiple"
            labelPlacement="outside"
            placeholder="All Parents"
            aria-label="All Parents"
            className="w-40"
            variant="bordered"
            selectedKeys={selectedParents}
            onClose={handleApplyFilter}
            isDisabled={
              dataToRender.length === 0 ||
              dataToRender.filter((data) => data.basicInformation.parent !== "")
                .length === 0
            }
            onChange={(e) => {
              e.target.value === ""
                ? setSelectedParents(new Set())
                : setSelectedParents(new Set(e.target.value.split(",")));
            }}
          >
            {[
              ...new Set(
                dataToRender.map((data) => data.basicInformation.parent)
              ),
            ]
              .filter((data) => data != "")
              .map((data) => (
                <SelectItem key={data} value={data}>
                  {data}
                </SelectItem>
              ))}
          </Select>
          <FilterX
            height={20}
            width={20}
            aria-label="Clear Filters"
            onClick={handleClearAllFilters}
            className="hover:cursor-pointer hover:text-blue-400"
          />
        </div>
        <Input
          type="text"
          variant="bordered"
          placeholder="Search"
          labelPlacement="outside"
          aria-label="Search"
          className="pl-2 rounded-2xl text-sm w-52"
          onChange={handleSearchTextChange}
          value={searchText}
        />
      </div>
      <div className="mt-3 lg:mx-[10%]">
        <Progress
          aria-label="Loading..."
          isIndeterminate
          size="sm"
          className={`${!isLoading && !isLoadingFilters ? "invisible" : ""}`}
        />
        <Table
          aria-label="Templates table"
          className="mt-2"
          isHeaderSticky
          classNames={{
            base: "max-h-[calc(100vh-200px)] overflow-y-scroll",
          }}
        >
          <TableHeader columns={tableColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={tableRows}>
            {(row) => (
              <TableRow key={row.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
