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

interface InstanceMoreOptionsProps {
  readonly externalId: string;
  readonly message?: string;
  readonly isEdit?: boolean;
}

export const InstanceMoreOptions = ({
  externalId,
  message,
  isEdit,
}: InstanceMoreOptionsProps) => {
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
                ? `/instances/edit/${externalId}?config=basic-information`
                : `/instances/${externalId}?config=basic-information`
            }
          >
            Instance
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to={
              isEdit
                ? `/instances/edit/${externalId}?config=attributes`
                : `/instances/${externalId}?config=attributes`
            }
          >
            Attributes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to={
              isEdit
                ? `/instances/edit/${externalId}?config=relationships`
                : `/instances/${externalId}?config=relationships`
            }
          >
            Relationships
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to={
              isEdit
                ? `/instances/edit/${externalId}?config=metrics`
                : `/instances/${externalId}?config=metrics`
            }
          >
            Metrics
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
