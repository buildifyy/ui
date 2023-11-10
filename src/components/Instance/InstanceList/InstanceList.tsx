import { ChangeEvent, useEffect, useRef, useState } from "react";
import { InstanceFormData } from "@/models";
import { Header } from "@/components/shared";
import { Check, FilterX, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInstanceList } from "@/service";
import { InstanceMoreOptions } from "@/components/Instance";
import { Progress, Select, SelectItem } from "@nextui-org/react";

export const InstanceList = () => {
  const [dataToRender, setDataToRender] = useState<InstanceFormData[]>([]);
  const [searchText, setSearchText] = useState<string>();
  const [selectedExternalIds, setSelectedExternalIds] = useState(
    new Set<string>([])
  );
  const [selectedNames, setSelectedNames] = useState(new Set<string>([]));
  const [selectedParents, setSelectedParents] = useState(new Set<string>([]));
  const cachedList = useRef<InstanceFormData[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(false);
  const { data: instanceList, isLoading } = useInstanceList();
  const showFilteredResultsHelper =
    (searchText ||
      (selectedExternalIds && selectedExternalIds.size > 0) ||
      (selectedNames && selectedNames.size > 0) ||
      (selectedParents && selectedParents.size > 0)) &&
    dataToRender.length !== 0 &&
    !isLoading;

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (
      selectedExternalIds.size === 0 &&
      selectedNames.size === 0 &&
      selectedParents.size === 0
    ) {
      setDataToRender(cachedList.current);
    }
  }, [selectedExternalIds, selectedNames, selectedParents]);

  useEffect(() => {
    if (instanceList) {
      cachedList.current = instanceList;
      setDataToRender(instanceList);
    }
  }, [instanceList]);

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

  return (
    <div className="w-full">
      <Header value="Instances" isListView />
      <div className="flex justify-between mt-4 lg:mx-[10%] mx-0">
        <div className="flex gap-2 items-center">
          <Select
            selectionMode="multiple"
            labelPlacement="outside"
            placeholder="All External IDs"
            aria-label="All External IDs"
            className="w-40"
            variant="bordered"
            selectedKeys={selectedExternalIds}
            onClose={handleApplyFilter}
            isDisabled={dataToRender.length === 0}
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
            onClose={handleApplyFilter}
            variant="bordered"
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
            onClose={handleApplyFilter}
            variant="bordered"
            selectedKeys={selectedParents}
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
            ].map((data) => (
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
          placeholder="Search"
          className="px-4 rounded-2xl text-sm w-52"
          onChange={handleSearchTextChange}
          value={searchText}
        />
      </div>
      <div className="h-[calc(100vh-200px)] overflow-y-auto border rounded-tl-none rounded-tr-none rounded-2xl mt-5 pb-3 lg:mx-[10%] mx-0">
        {isLoading || isLoadingFilters ? (
          <Progress aria-label="Loading..." isIndeterminate size="sm" />
        ) : null}
        <Table className="w-full border-collapse">
          <TableHeader className="sticky top-0 h-12 bg-[hsl(var(--background))] shadow-th">
            <TableRow className="border-b">
              <TableHead className="p-2 pl-4 text-left text-[0.9rem] font-bold">
                External ID
              </TableHead>
              <TableHead className="p-2 text-left text-[0.9rem] font-bold">
                Name
              </TableHead>
              <TableHead className="p-2 text-left text-[0.9rem] font-bold">
                Parent
              </TableHead>
              <TableHead className="p-2 text-left text-[0.9rem] font-bold">
                Custom
              </TableHead>
              <TableHead className="p-2 text-left w-20 text-[0.9rem] font-bold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataToRender.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="p-4">
                  No instances found
                </TableCell>
              </TableRow>
            ) : (
              dataToRender.map((data, i) => (
                <TableRow key={i} className="border-b last:border-none">
                  <TableCell className="p-2 pl-4 text-[0.9rem] italic">
                    {data.basicInformation.externalId}
                  </TableCell>
                  <TableCell className="p-2 text-[0.9rem]">
                    {data.basicInformation.name}
                  </TableCell>
                  <TableCell className="p-2 text-[0.9rem] italic">
                    {data.basicInformation.parent}
                  </TableCell>
                  <TableCell className="p-2 text-[0.9rem]">
                    {data.basicInformation.isCustom ? (
                      <Check height={17} width={17} />
                    ) : (
                      <X height={17} width={17} />
                    )}
                  </TableCell>
                  <TableCell className="p-3 text-[0.9rem] flex gap-2">
                    <InstanceMoreOptions
                      externalId={data.basicInformation.externalId}
                      message="View Options"
                    />
                    {data.basicInformation.isCustom && (
                      <InstanceMoreOptions
                        externalId={data.basicInformation.externalId}
                        message="Edit Options"
                        isEdit
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {showFilteredResultsHelper && (
        <div className="text-right text-gray-500 text-md mt-2">
          {dataToRender.length} filtered{" "}
          {dataToRender.length > 1 ? "results" : "result"}
        </div>
      )}
    </div>
  );
};
