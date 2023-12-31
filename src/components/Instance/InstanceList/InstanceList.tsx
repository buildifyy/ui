import { ChangeEvent, useEffect, useRef, useState } from "react";
import { InstanceFormData } from "@/models";
import { Header } from "@/components/shared";
import { FilterX, Workflow } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useInstanceList, useRelationships } from "@/service";
import {
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { InstanceMoreOptions } from "..";
import Graphin, {
  Behaviors,
  GraphinData,
  IUserEdge,
  IUserNode,
  Utils,
} from "@antv/graphin";

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
  const { data: relationshipTemplates } = useRelationships();
  const [graphDataToRender, setGraphDataToRender] = useState<GraphinData>({
    nodes: [],
    edges: [],
  });

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
      label: "TYPE",
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
          <InstanceMoreOptions
            externalId={data.basicInformation.externalId}
            message="View Options"
          />
        </div>
      ),
    };
  });

  const handlePopoverClick = (isOpen: boolean) => {
    if (isOpen) {
      const nodes: IUserNode[] = [];
      const edges: IUserEdge[] = [];
      instanceList?.forEach((instance) => {
        nodes.push({
          id: instance.basicInformation.externalId,
          style: {
            label: {
              value: instance.basicInformation.externalId,
              offset: [0, 10],
            },
            keyshape: {
              stroke:
                instance.basicInformation.rootTemplate === "p.com.asset"
                  ? "blue"
                  : "red",
              fill:
                instance.basicInformation.rootTemplate === "p.com.asset"
                  ? "blue"
                  : "red",
            },
          },
        });

        instance.relationships?.forEach((relationship) => {
          const relationshipName = relationshipTemplates?.find(
            (relationshipTemplate) =>
              relationshipTemplate.id === relationship.relationshipTemplateId
          )?.name;
          if (Array.isArray(relationship.target)) {
            relationship.target.forEach((target) => {
              nodes.push({
                id: target,
                style: {
                  label: {
                    value: target,
                    offset: [0, 10],
                  },
                  keyshape: {
                    stroke: target.includes("asset") ? "blue" : "red",
                    fill: target.includes("asset") ? "blue" : "red",
                  },
                },
              });

              edges.push({
                source: instance.basicInformation.externalId,
                target: target,
                style: {
                  label: {
                    value: relationshipName,
                  },
                },
              });
            });
          } else if (relationship.target) {
            nodes.push({
              id: relationship.target,
              style: {
                label: {
                  value: relationship.target,
                  offset: [0, 10],
                },
                keyshape: {
                  stroke: relationship.target.includes("asset")
                    ? "blue"
                    : "red",
                  fill: relationship.target.includes("asset") ? "blue" : "red",
                },
              },
            });

            edges.push({
              source: instance.basicInformation.externalId,
              target: relationship.target,
              style: {
                label: {
                  value: relationshipName,
                },
              },
            });
          }
        });
      });

      setGraphDataToRender({
        nodes,
        edges: Utils.processEdges([...edges], {
          poly: 100,
          loop: 10,
        }),
      });
    }
  };

  const { ZoomCanvas } = Behaviors;

  return (
    <div className="w-full">
      <Header value="Instances" isListView />
      <div className="flex justify-between mt-4 lg:mx-[10%]">
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
        <div className="flex gap-2 items-center">
          <Popover
            showArrow
            placement="bottom-end"
            onOpenChange={handlePopoverClick}
            backdrop="blur"
          >
            <PopoverTrigger>
              <Workflow
                width={20}
                height={20}
                className="hover:cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Graphin
                data={graphDataToRender}
                layout={{
                  type: "force2",
                  linkDistance: 1,
                  nodeStrength: 50000,
                  edgeStrength: 50,
                  gravity: 50,
                  workerEnabled: true,
                }}
                theme={{
                  mode: "dark",
                  background:
                    "hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))",
                  edgeSize: 2,
                  nodeSize: 30,
                }}
                style={{
                  borderRadius: "10px",
                  height: "400px",
                  width: "700px",
                }}
              >
                <ZoomCanvas />
              </Graphin>
            </PopoverContent>
          </Popover>
          <Input
            type="text"
            placeholder="Search"
            className="px-4 rounded-2xl text-sm w-52"
            onChange={handleSearchTextChange}
            value={searchText}
          />
        </div>
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
          isStriped
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
