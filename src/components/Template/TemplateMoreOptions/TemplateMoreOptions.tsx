import { Edit, Eye } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
} from "@nextui-org/react";

interface TemplateMoreOptionsProps {
  readonly externalId: string;
  readonly message?: string;
  readonly isEdit?: boolean;
}

export const TemplateMoreOptions = ({
  externalId,
  isEdit,
}: TemplateMoreOptionsProps) => {
  const dropdownItems = [
    {
      key: "template",
      label: "Template",
      href: isEdit
        ? `/templates/edit/${externalId}?config=basic-information`
        : `/templates/${externalId}?config=basic-information`,
    },
    {
      key: "divider",
      label: <Divider />,
    },
    {
      key: "attributes",
      label: "Attributes",
      href: isEdit
        ? `/templates/edit/${externalId}?config=attributes`
        : `/templates/${externalId}?config=attributes`,
    },
    {
      key: "relationships",
      label: "Relationships",
      href: isEdit
        ? `/templates/edit/${externalId}?config=relationships`
        : `/templates/${externalId}?config=relationships`,
    },
    {
      key: "metrics",
      label: "Metrics",
      href: isEdit
        ? `/templates/edit/${externalId}?config=metrics`
        : `/templates/${externalId}?config=metrics`,
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
