import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import me from "../../../assets/me.jpg";
import "./Sidebar.css";
import { Dropdown, TemplateFormData } from "../../../models";
import { useFormContext } from "react-hook-form";
import { Select } from "../../shared";

export const Sidebar = () => {
  const {
    register,
    reset,
    formState: { errors },
  } = useFormContext<TemplateFormData>();
  const location = useLocation();

  const tenantData: Dropdown[] = [{ label: "the-binary", value: "the-binary" }];

  const handleFormReset = () => {
    const defaultValue = {
      basicInformation: {
        name: "",
        parent: "",
        externalId: "",
      },
      attributes: [],
      metricTypes: [],
    };
    reset(defaultValue);
  };

  return (
    <div className="flex flex-col justify-between border-e bg-white w-[300px]">
      <div className="px-4 py-6">
        <span className="grid h-10 w-32 place-content-center rounded-lg text-lg grid-cols-2 items-center ml-10">
          <img src={logo} width={50} height={50} />
          <span>Buildify</span>
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <div className="px-2 py-2">
              <label
                htmlFor="tenant"
                className="block text-sm font-medium text-gray-500"
              >
                Tenant
              </label>
              <div className="flex flex-col">
                <Select
                  id="tenant"
                  data={tenantData}
                  widthClassName="w-full"
                  {...register("tenant")}
                />
                {errors.tenant && (
                  <span className="text-xs text-red-600">
                    {errors.tenant.message}
                  </span>
                )}
              </div>
            </div>
          </li>
          <li>
            <details
              className="group"
              open={location.pathname.includes("/templates")}
            >
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Templates </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <Link
                    to={`/templates`}
                    className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      location.pathname === "/templates"
                        ? "bg-gray-100 text-gray-700"
                        : ""
                    }`}
                  >
                    List
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/templates/create`}
                    className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      location.pathname === "/templates/create"
                        ? "bg-gray-100 text-gray-700"
                        : ""
                    }`}
                    onClick={handleFormReset}
                  >
                    Create
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Instances </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                {/* <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    List
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    View
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Create
                  </a>
                </li>

                <li>
                  <a
                    href=""
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Edit
                  </a>
                </li> */}
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-gray-100">
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <img
            alt="Man"
            src={me}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">Varun Gupta</strong>

              <span> varungupta2015135@gmail.com </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};
