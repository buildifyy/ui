import { Plus } from "lucide-react";
import { Button } from "../../ui/button";

interface AddPanelProps {
  readonly title: string;
  readonly onAdd?: () => void;
}

export const AddPanel = ({ title, onAdd }: AddPanelProps) => {
  return (
    <Button
      variant="outline"
      className="w-full justify-start border-green-500 border-dashed"
      onClick={onAdd}
    >
      <Plus width={17} height={17} />
      <span className="ml-2">{title}</span>
    </Button>
  );
};
