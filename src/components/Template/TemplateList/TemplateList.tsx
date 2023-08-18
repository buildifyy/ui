import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TemplateFormData } from "@/models";
import Loader from "@/assets/loading.gif";
import { Filter, FilterOption, Header } from "@/components/shared";
import { useTemplateList } from "@/service";
import { TemplateMoreOptions } from "@/components/Template";
import { Check, X } from "lucide-react";

export const TemplateList = () => {
  const [dataToRender, setDataToRender] = useState<TemplateFormData[]>([]);
  const [searchText, setSearchText] = useState<string>();
  const [externalIdFilterOptions, setExternalIdFilterOptions] = useState<
    FilterOption[]
  >([]);
  const [selectedExternalIds, setSelectedExternalIds] = useState<string[]>();
  const [nameFilterOptions, setNameFilterOptions] = useState<FilterOption[]>(
    [],
  );
  const [selectedNames, setSelectedNames] = useState<string[]>();
  const [parentFilterOptions, setParentFilterOptions] = useState<
    FilterOption[]
  >([]);
  const [selectedParents, setSelectedParents] = useState<string[]>();
  const [isCustomFilterOptions, setIsCustomFilterOptions] = useState<
    FilterOption[]
  >([]);
  const [selectedIsCustom, setSelectedIsCustom] = useState<string[]>();
  const cachedList = useRef<TemplateFormData[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(false);
  const { data: templateList, isLoading } = useTemplateList();
  const showFilteredResultsHelper =
    (searchText ||
      (selectedExternalIds && selectedExternalIds.length > 0) ||
      (selectedNames && selectedNames.length > 0) ||
      (selectedParents && selectedParents.length > 0) ||
      (selectedIsCustom && selectedIsCustom.length > 0)) &&
    dataToRender.length !== 0 &&
    !isLoading;

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (templateList) {
      cachedList.current = templateList;
      setDataToRender(templateList);

      setExternalIdFilterOptions(
        templateList.map((data) => {
          return {
            label: data.basicInformation.externalId,
            value: data.basicInformation.externalId,
          };
        }),
      );

      const newNameFilterOptions: FilterOption[] = [];
      templateList.forEach((data) => {
        if (
          newNameFilterOptions.findIndex(
            (f) => f.value === data.basicInformation.name,
          ) === -1
        ) {
          newNameFilterOptions.push({
            label: data.basicInformation.name,
            value: data.basicInformation.name,
          });
        }
      });
      setNameFilterOptions(newNameFilterOptions);

      const newParentFilterOptions: FilterOption[] = [];
      templateList.forEach((data) => {
        if (
          newParentFilterOptions.findIndex(
            (f) => f.value === data.basicInformation.parent,
          ) === -1 &&
          data.basicInformation.parent
        ) {
          newParentFilterOptions.push({
            label: data.basicInformation.parent,
            value: data.basicInformation.parent,
          });
        }
      });
      setParentFilterOptions(newParentFilterOptions);

      const newIsCustomFilterOptions: FilterOption[] = [];
      templateList.forEach((data) => {
        if (
          newIsCustomFilterOptions.findIndex(
            (f) => f.value === data.basicInformation.isCustom.toString(),
          ) === -1
        ) {
          newIsCustomFilterOptions.push({
            label:
              data.basicInformation.isCustom
                .toString()
                .charAt(0)
                .toUpperCase() +
              data.basicInformation.isCustom.toString().slice(1),
            value: data.basicInformation.isCustom.toString(),
          });
        }
      });
      setIsCustomFilterOptions(newIsCustomFilterOptions);
    }
  }, [templateList]);

  useEffect(() => {
    setIsLoadingFilters(true);
    const getFilteredResults = setTimeout(() => {
      let filteredList = cachedList.current;
      if (searchText) {
        const listCopy = [...cachedList.current];
        filteredList = listCopy.filter(
          (i: TemplateFormData) =>
            i.basicInformation.externalId
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            i.basicInformation.name
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            i.basicInformation.parent
              .toLowerCase()
              .includes(searchText.toLowerCase()),
        );
      }

      if (selectedExternalIds && selectedExternalIds.length > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i: TemplateFormData) =>
          selectedExternalIds.includes(i.basicInformation.externalId),
        );
      }

      if (selectedNames && selectedNames.length > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i: TemplateFormData) =>
          selectedNames.includes(i.basicInformation.name),
        );
      }

      if (selectedParents && selectedParents.length > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i: TemplateFormData) =>
          selectedParents.includes(i.basicInformation.parent),
        );
      }

      if (selectedIsCustom && selectedIsCustom.length > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter((i: TemplateFormData) =>
          selectedIsCustom.includes(i.basicInformation.isCustom.toString()),
        );
      }

      if (
        searchText === "" &&
        selectedExternalIds?.length === 0 &&
        selectedNames?.length === 0 &&
        selectedParents?.length === 0 &&
        selectedIsCustom?.length === 0
      ) {
        filteredList = cachedList.current;
      }

      setDataToRender(filteredList);
      setIsLoadingFilters(false);
    }, 1000);

    return () => clearTimeout(getFilteredResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchText,
    selectedExternalIds,
    selectedNames,
    selectedParents,
    selectedIsCustom,
  ]);

  const handleClearAllFilters = () => {
    setSelectedExternalIds([]);
    setSelectedNames([]);
    setSelectedParents([]);
    setSelectedIsCustom([]);
    setSearchText("");
  };

  return (
    <div className="w-full">
      <Header value="Templates" />
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <Filter
            options={externalIdFilterOptions}
            selectedValues={selectedExternalIds}
            setSelectedValues={setSelectedExternalIds}
            placeholderText="All External IDs"
          />
          <Filter
            options={nameFilterOptions}
            selectedValues={selectedNames}
            setSelectedValues={setSelectedNames}
            placeholderText="All Names"
          />
          <Filter
            options={parentFilterOptions}
            selectedValues={selectedParents}
            setSelectedValues={setSelectedParents}
            placeholderText="All Parents"
          />
          <Filter
            options={isCustomFilterOptions}
            selectedValues={selectedIsCustom}
            setSelectedValues={setSelectedIsCustom}
            placeholderText="All Customs"
          />
          <span
            className="hover:cursor-pointer hover:text-blue-600 text-sm"
            onClick={handleClearAllFilters}
          >
            Clear all filters
          </span>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="pl-4 py-1 pr-1 border-2 rounded-2xl"
          onChange={handleSearchTextChange}
          value={searchText}
        />
      </div>
      <div className="max-h-[calc(100%-7rem)] overflow-y-auto border rounded-2xl mt-5 pb-3">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#f5f4f6]">
            <tr className="border-b">
              <th className="p-2 pl-4 text-left text-[0.9rem] font-bold">
                External ID
              </th>
              <th className="p-2 text-left text-[0.9rem] font-bold">Name</th>
              <th className="p-2 text-left text-[0.9rem] font-bold">Parent</th>
              <th className="p-2 text-left text-[0.9rem] font-bold">Custom</th>
              <th className="p-2 text-left w-20 text-[0.9rem] font-bold"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isLoadingFilters ? (
              <td colSpan={4} className="p-4">
                <div className="flex justify-center">
                  <img src={Loader} alt="loading" width="30px" />
                </div>
              </td>
            ) : dataToRender.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4">
                  No templates found
                </td>
              </tr>
            ) : (
              dataToRender.map((data, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="p-2 pl-4 text-[0.9rem] italic">
                    {data.basicInformation.externalId}
                  </td>
                  <td className="p-2 text-[0.9rem]">
                    {data.basicInformation.name}
                  </td>
                  <td className="p-2 text-[0.9rem] italic">
                    {data.basicInformation.parent}
                  </td>
                  <td className="p-2 text-[0.9rem]">
                    {data.basicInformation.isCustom ? (
                      <Check height={17} width={17} />
                    ) : (
                      <X height={17} width={17} />
                    )}
                  </td>
                  <td className="p-3 text-[0.9rem] flex gap-2">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
