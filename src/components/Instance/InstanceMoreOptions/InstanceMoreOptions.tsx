import { Edit, Eye } from "lucide-react";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

interface InstanceMoreOptionsProps {
  readonly externalId: string;
  readonly message?: string;
  readonly isEdit?: boolean;
}

export const InstanceMoreOptions = ({
  externalId,
  isEdit,
}: InstanceMoreOptionsProps) => {
  const dropdownItems = [
    {
      key: "instance",
      label: "Instance",
      href: isEdit
        ? `/instances/edit/${externalId}?config=basic-information`
        : `/instances/${externalId}?config=basic-information`,
    },
    {
      key: "divider",
      label: <Divider />,
    },
    {
      key: "attributes",
      label: "Attributes",
      href: isEdit
        ? `/instances/edit/${externalId}?config=attributes`
        : `/instances/${externalId}?config=attributes`,
    },
    {
      key: "relationships",
      label: "Relationships",
      href: isEdit
        ? `/instances/edit/${externalId}?config=relationships`
        : `/instances/${externalId}?config=relationships`,
    },
    {
      key: "metrics",
      label: "Metrics",
      href: isEdit
        ? `/instances/edit/${externalId}?config=metrics`
        : `/instances/${externalId}?config=metrics`,
    },
  ];
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        {isEdit ? (
          <Edit height={15} width={15} className="hover:cursor-pointer" />
        ) : (
          <Eye height={17} width={17} className="hover:cursor-pointer" />
        )}
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="More options menu"
        disabledKeys={["divider"]}
        items={dropdownItems}
      >
        {(item) => (
          <DropdownItem key={item.key} href={item.href}>
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
