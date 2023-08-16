import { useFormContext, useWatch } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  readonly value: string;
}

export const Header = ({ value }: HeaderProps) => {
  const location = useLocation();
  const { control } = useFormContext<TemplateFormData>();

  const externalIdLive = useWatch<TemplateFormData>({
    name: "basicInformation.name",
    control,
  });

  const helperText =
    location.pathname.includes("/create") || location.pathname.includes("/edit")
      ? location.pathname.includes("/create")
        ? `Creating ${externalIdLive ? externalIdLive : "Untitled"}`
        : `Editing ${externalIdLive ? externalIdLive : "Untitled"}`
      : null;

  return (
    <div className="flex justify-between items-end">
      <h1 className="text-2xl font-bold text-gray-900">{value}</h1>
      <span className="text-sm italic">{helperText}</span>
    </div>
  );
};
