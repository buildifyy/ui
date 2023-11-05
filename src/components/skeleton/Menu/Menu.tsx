import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Select } from "@/components/shared";
import { Link, useLocation } from "react-router-dom";
import me from "@/assets/me.jpg";
import { useFormContext } from "react-hook-form";
import { Dropdown, TemplateFormData } from "@/models";
import { useState } from "react";

export const Menu = () => {
  const {
    register,
    reset,
    formState: { errors },
  } = useFormContext<TemplateFormData>();
  const location = useLocation();

  const tenantData: Dropdown[] = [{ label: "the-binary", value: "the-binary" }];

  const [isOpen, setIsOpen] = useState(false);

  const handleFormReset = () => {
    reset((prev) => {
      return {
        tenant: prev.tenant,
        basicInformation: {
          parent: "",
          name: "",
          externalId: "",
          isCustom: true,
        },
        attributes: [],
        metricTypes: [],
      };
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex h-fit border-r">
        <div className="flex items-center p-2 gap-2">
          <MenuIcon width={25} height={25} />
          <div className="text-xl font-mina mt-1">Buildifyy</div>
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[400px] sm:w-[540px]"
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <div className="flex flex-col justify-between w-full -m-2">
          <div>
            <ul className="mt-6 space-y-1">
              <li>
                <div className="px-2 py-2">
                  <label htmlFor="tenant" className="block text-sm font-medium">
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
                <details className="group" open>
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2">
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
                    <li
                      className={`${
                        location.pathname === "/templates"
                          ? "border-solid border rounded-lg"
                          : ""
                      } `}
                    >
                      <Link
                        to="/templates"
                        className="block rounded-lg px-4 py-2 text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        List
                      </Link>
                    </li>
                    <li
                      className={`${
                        location.pathname === "/templates/create"
                          ? "border-solid border rounded-lg"
                          : ""
                      } `}
                    >
                      <Link
                        to={`/templates/create`}
                        className="block rounded-lg px-4 py-2 text-sm font-medium"
                        onClick={handleFormReset}
                      >
                        Create
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <details
                  className="group [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2">
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
                    <li
                      className={`${
                        location.pathname === "/instances"
                          ? "border-solid border rounded-lg"
                          : ""
                      } `}
                    >
                      <Link
                        to="/instances"
                        className="block rounded-lg px-4 py-2 text-sm font-medium"
                        onClick={handleFormReset}
                      >
                        List
                      </Link>
                    </li>
                    <li
                      className={`${
                        location.pathname === "/instances/create"
                          ? "border-solid border rounded-lg"
                          : ""
                      } `}
                    >
                      <Link
                        to="/instances/create"
                        className="block rounded-lg px-4 py-2 text-sm font-medium"
                        onClick={handleFormReset}
                      >
                        Create
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-gray-100">
            <a href="#" className="flex items-center gap-2 hover:bg-gray-50">
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
      </SheetContent>
    </Sheet>
  );
};
