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
        ? `Creating Template ${templateNameLive}`
        : `Editing Template ${templateNameLive}`
      : templateId
      ? `Viewing Template ${templateNameLive}`
      : null;

  return (
    <div className="flex justify-between items-end">
      <div className="flex flex-col">
        <span className="text-sm italic">{helperText}</span>
        <h1 className="text-xl font-bold text-gray-900">{value}</h1>
      </div>
    </div>
  );
};
