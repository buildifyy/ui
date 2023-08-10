import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Header} from "../..";
import {BasicInformation, CreateTemplateFormData} from "../../../models";
import {Link} from "react-router-dom";
import {FaEye, FaBan, FaCheck} from "react-icons/fa6";
import {Filter, FilterOption} from "../../Filter";

export const TemplateList = () => {
  const [dataToRender, setDataToRender] = useState<BasicInformation[]>([]);
  const [searchText, setSearchText] = useState<string>();
  const [externalIdFilterOptions, setExternalIdFilterOptions] = useState<FilterOption[]>([]);
  const [selectedExternalIds, setSelectedExternalIds] = useState<string[]>();
  const [nameFilterOptions, setNameFilterOptions] = useState<FilterOption[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>();
  const [parentFilterOptions, setParentFilterOptions] = useState<FilterOption[]>([]);
  const [selectedParents, setSelectedParents] = useState<string[]>();
  const [isCustomFilterOptions, setIsCustomFilterOptions] = useState<FilterOption[]>([]);
  const [selectedIsCustom, setSelectedIsCustom] = useState<string[]>();
  const cachedList = useRef<BasicInformation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showFilteredResultsHelper = (searchText || selectedExternalIds && selectedExternalIds.length > 0) && dataToRender.length !== 0 && !isLoading;

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const localData = localStorage.getItem("template");
    const jsonData: CreateTemplateFormData = localData
      ? JSON.parse(localData)
      : {};
    if (jsonData && jsonData.basicInformation) {
      const toAdd = [jsonData.basicInformation];
      for (let i = 2; i <= 40; i++) {
        toAdd.push({
          ...jsonData.basicInformation,
          name: `Test Template ${i}`,
          externalId: `TestTemplate${i}`,
        });
      }
      cachedList.current = toAdd;

      setExternalIdFilterOptions(toAdd.map(data => {
        return {
          label: data.externalId,
          value: data.externalId
        }
      }));
      setNameFilterOptions(toAdd.map(data => {
        return {
          label: data.name,
          value: data.name
        }
      }));
      setParentFilterOptions(toAdd.map(data => {
        return {
          label: data.parent,
          value: data.parent
        }
      }));
      setIsCustomFilterOptions(toAdd.map(data => {
        return {
          label: data.isCustom.toString(),
          value: data.isCustom.toString()
        }
      }));
      setDataToRender(toAdd);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getFilteredResults = setTimeout(() => {
      let filteredList = cachedList.current;
      if (searchText) {
        const listCopy = [...cachedList.current];
        filteredList = listCopy.filter(
          (i) =>
            i.externalId.toLowerCase().includes(searchText.toLowerCase()) ||
            i.name.toLowerCase().includes(searchText.toLowerCase()) ||
            i.parent.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      if (selectedExternalIds && selectedExternalIds.length > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter(
          (i) =>
            selectedExternalIds.includes(i.externalId)
        );
      }

      if (selectedNames && selectedNames.length > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter(
          (i) =>
            selectedNames.includes(i.name)
        );
      }

      if (selectedParents && selectedParents.length > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter(
          (i) =>
            selectedParents.includes(i.parent)
        );
      }

      if (selectedIsCustom && selectedIsCustom.length > 0) {
        const listCopy = [...filteredList];
        filteredList = listCopy.filter(
          (i) =>
            selectedIsCustom.includes(i.isCustom.toString())
        );
      }

      if (searchText === "" && selectedExternalIds?.length === 0 && selectedNames?.length === 0 && selectedParents?.length === 0 && selectedIsCustom?.length === 0) {
        filteredList = cachedList.current;
      }

      setDataToRender(filteredList);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(getFilteredResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, selectedExternalIds, selectedNames, selectedParents, selectedIsCustom]);

  return (
    <div className="w-full">
      <Header value="Templates"/>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
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
        </div>
        <input
          type="text"
          placeholder="Search"
          className="pl-4 py-1 pr-1 border rounded-2xl"
          onChange={handleSearchTextChange}
        />
      </div>
      <div className="max-h-[calc(100%-10rem)] overflow-y-auto border rounded-2xl mt-5">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#f5f4f6]">
          <tr className="border-b">
            <th className="p-4 text-left">External ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Parent</th>
            <th className="p-4 text-left">Custom</th>
            <th className="p-4 text-left w-20"></th>
          </tr>
          </thead>
          <tbody>
          {dataToRender.length === 0 ? <tr>
            <td colSpan={4} className="p-4">No templates found</td>
          </tr> : isLoading ?
            <td colSpan={4} className="p-4 text-center">Loading...</td> : dataToRender.map((data, i) =>
              <tr key={i} className="border-b">
                <td className="p-4">
                  {data.externalId}
                </td>
                <td className="p-4">{data.name}</td>
                <td className="p-4">{data.parent}</td>
                <td className="p-4">
                  {data.isCustom ? <FaCheck/> : <FaBan/>}
                </td>
                <Link key={i} to={`/templates/${data.externalId}`}>
                  <td className="p-4 w-fit hover:cursor-pointer">
                    <FaEye className="border rounded-3xl h-8 w-8 p-2 hover:scale-110"/>
                  </td>
                </Link>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showFilteredResultsHelper && (
        <div className="text-right text-gray-500 text-md mt-2">
          {dataToRender.length} filtered {dataToRender.length > 1 ? "results" : "result"}
        </div>)}
    </div>
  );
};
