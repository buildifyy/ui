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
        <DropdownMenuLabel>View</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/templates/${externalId}`}>Template</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Attributes</DropdownMenuItem>
        <DropdownMenuItem>Relationships</DropdownMenuItem>
        <DropdownMenuItem>Metric Types</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
