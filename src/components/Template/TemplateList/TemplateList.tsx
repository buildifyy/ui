import { useEffect, useRef, useState } from "react";
import { Header } from "../..";
import { BasicInformation, CreateTemplateFormData } from "../../../models";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const TemplateList = () => {
  const [dataToRender, setDataToRender] = useState<BasicInformation[]>([]);
  const [searchText, setSearchText] = useState<string>();
  const cachedList = useRef<BasicInformation[]>([]);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const localData = localStorage.getItem("template");
    const jsonData: CreateTemplateFormData = localData
      ? JSON.parse(localData)
      : {};
    if (jsonData && jsonData.basicInformation) {
      const toAdd = [jsonData.basicInformation];
      for (let i = 2; i <= 20; i++) {
        toAdd.push({
          ...jsonData.basicInformation,
          name: `Test Template ${i}`,
          externalId: `TestTemplate${i}`,
        });
      }
      cachedList.current = toAdd;
      setDataToRender(toAdd);
    }
  }, []);

  useEffect(() => {
    const getFilteredResults = setTimeout(() => {
      if (searchText) {
        const listCopy = [...cachedList.current];
        const filteredList = listCopy.filter(
          (i) =>
            i.externalId.toLowerCase().includes(searchText.toLowerCase()) ||
            i.name.toLowerCase().includes(searchText.toLowerCase())
        );
        console.log("filteredResults: ", filteredList);
        setDataToRender(filteredList);
      }

      if (searchText === "") {
        setDataToRender(cachedList.current);
      }
    }, 500);

    return () => clearTimeout(getFilteredResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <div className="w-full">
      <Header value="Templates" />
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="pl-4 py-1 pr-1 border rounded-2xl w-[50%]"
          onChange={handleSearchTextChange}
        />
      </div>
      <ul className="list-none grid grid-cols-1 gap-5 mt-2 py-5 px-10 max-h-[35rem] overflow-y-auto">
        {dataToRender.length === 0 ? (
          <li className="flex items-center px-5 py-2">
            <span className="text-gray-500 ml-1 text-md">
              No templates found
            </span>
          </li>
        ) : (
          dataToRender?.map((data, i) => (
            <Link key={i} to={`/templates/${data.externalId}`}>
              <li className="flex justify-between items-center border rounded-2xl px-5 py-2 hover:bg-gray-100 hover:cursor-pointer">
                <div>
                  {data.name} -
                  <span className="text-gray-500 ml-1 text-sm">
                    {data.externalId}
                  </span>
                </div>
                <div>
                  <FaAngleRight className="text-sm" />
                </div>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};
