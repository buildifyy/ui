import {useEffect, useRef, useState} from "react";
import {Header} from "../..";
import {BasicInformation, CreateTemplateFormData} from "../../../models";
import {Link} from "react-router-dom";
import {FaEye, FaBan, FaCheck} from "react-icons/fa6";
import {Filter} from "../../Filter";

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
            for (let i = 2; i <= 40; i++) {
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
                        i.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        i.parent.toLowerCase().includes(searchText.toLowerCase())
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
            <Header value="Templates"/>
            <div className="flex justify-between">
                <Filter />
                <input
                    type="text"
                    placeholder="Search"
                    className="pl-4 py-1 pr-1 border rounded-2xl w-[30%]"
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
                    </tr> : dataToRender.map((data, i) =>
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
            {searchText && dataToRender.length !== 0 && (<div className="text-right text-gray-500 text-md mt-2">
                {dataToRender.length} filtered {dataToRender.length > 1 ? "results" : "result"}
            </div>)}
        </div>
    );
};
