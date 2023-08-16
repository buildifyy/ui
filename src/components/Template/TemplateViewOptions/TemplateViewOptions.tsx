import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

interface TemplateViewOptionsProps {
  readonly externalId: string;
}

export const TemplateViewOptions = ({
  externalId,
}: TemplateViewOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Eye height={15} width={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>View Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/templates/${externalId}?config=basic-information`}>
            Template
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={`/templates/${externalId}?config=attributes`}>
            Attributes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={`/templates/${externalId}?config=relationships`}>
            Relationships
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={`/templates/${externalId}?config=metric-types`}>
            Metric Types
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
