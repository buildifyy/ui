import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";
import me from "../../assets/me.jpg";
import "./Sidebar.css";

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-between border-e bg-white w-[300px]">
      <div className="px-4 py-6">
        <span className="grid h-10 w-32 place-content-center rounded-lg text-lg grid-cols-2 items-center ml-10">
          <img src={logo} width={50} height={50} />
          <span>Buildify</span>
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <div className="px-4 py-2">
              <label
                htmlFor="HeadlineAct"
                className="block text-sm font-medium text-gray-500"
              >
                Tenant
              </label>

              <select
                name="HeadlineAct"
                id="HeadlineAct"
                className="-ml-[2px] mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 px-1 text-lg"
              >
                <option value="">Please select</option>
                <option value="JM">John Mayer</option>
                <option value="SRV">Stevie Ray Vaughn</option>
                <option value="JH">Jimi Hendrix</option>
                <option value="BBK">B.B King</option>
                <option value="AK">Albert King</option>
                <option value="BG">Buddy Guy</option>
                <option value="EC">Eric Clapton</option>
              </select>
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
                    to={`/templates/abcdefg`}
                    className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      location.pathname === "/templates/abcdefg"
                        ? "bg-gray-100 text-gray-700"
                        : ""
                    }`}
                  >
                    View
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
                  >
                    Create
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/templates/edit/abcdefg`}
                    className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                      location.pathname === "/templates/edit/abcdefg"
                        ? "bg-gray-100 text-gray-700"
                        : ""
                    }`}
                  >
                    Edit
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
