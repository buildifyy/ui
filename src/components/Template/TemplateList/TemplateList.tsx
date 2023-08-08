import { useEffect, useState } from "react";
import { Header } from "../..";
import { BasicInformation, CreateTemplateFormData } from "../../../models";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const TemplateList = () => {
  const [dataToRender, setDataToRender] = useState<BasicInformation[]>([]);

  useEffect(() => {
    const localData = localStorage.getItem("template");
    const jsonData: CreateTemplateFormData = localData
      ? JSON.parse(localData)
      : {};
    if (jsonData && jsonData.basicInformation) {
      const toAdd = [jsonData.basicInformation];
      for (let i = 0; i < 20; i++) {
        toAdd.push(jsonData.basicInformation);
      }
      setDataToRender(toAdd);
    }
  }, []);

  return (
    <div className="w-full">
      <Header value="Templates" />
      <ul className="list-none grid grid-cols-1 gap-5 mt-5 mx-10 py-5 px-10 max-h-[42rem] overflow-y-auto">
        {dataToRender?.map((data, i) => (
          <Link key={i} to={`/templates/${data.externalId}`}>
            <li className="flex justify-between items-center h-14 border rounded-2xl px-5 hover:bg-gray-100 hover:cursor-pointer">
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
        ))}
      </ul>
    </div>
  );
};
