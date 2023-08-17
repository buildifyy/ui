import { useFormContext, useWatch } from "react-hook-form";
import { TemplateFormData } from "@/models";
import { useLocation, useParams } from "react-router-dom";

interface HeaderProps {
  readonly value: string;
}

export const Header = ({ value }: HeaderProps) => {
  const location = useLocation();
  const { templateId } = useParams();
  const { control } = useFormContext<TemplateFormData>();

  const templateNameLive = useWatch<TemplateFormData>({
    name: "basicInformation.name",
    control,
  });

  const helperText =
    location.pathname.includes("/create") || location.pathname.includes("/edit")
      ? location.pathname.includes("/create")
        ? `Creating ${templateNameLive}`
        : `Editing ${templateNameLive}`
      : templateId
      ? `Viewing ${templateNameLive}`
      : null;

  return (
    <div className="flex justify-between items-end">
      <h1 className="text-2xl font-bold text-gray-900">{value}</h1>
      <span className="text-sm italic">{helperText}</span>
    </div>
  );
};
