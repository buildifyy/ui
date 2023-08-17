import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Edit, Eye } from "lucide-react";

interface TemplateViewOptionsProps {
  readonly externalId: string;
  readonly message?: string;
  readonly isEdit?: boolean;
}

export const TemplateMoreOptions = ({
  externalId,
  message,
  isEdit,
}: TemplateViewOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isEdit ? (
          <Edit height={15} width={15} />
        ) : (
          <Eye height={17} width={17} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{message}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            to={
              isEdit
                ? `/templates/edit/${externalId}?config=basic-information`
                : `/templates/${externalId}?config=basic-information`
            }
          >
            Template
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to={
              isEdit
                ? `/templates/edit/${externalId}?config=attributes`
                : `/templates/${externalId}?config=attributes`
            }
          >
            Attributes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to={
              isEdit
                ? `/templates/edit/${externalId}?config=relationships`
                : `/templates/${externalId}?config=relationships`
            }
          >
            Relationships
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to={
              isEdit
                ? `/templates/edit/${externalId}?config=metric-types`
                : `/templates/${externalId}?config=metric-types`
            }
          >
            Metric Types
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
