import { useFormContext, useWatch } from "react-hook-form";
import { InstanceFormData, TemplateFormData } from "@/models";
import { useLocation, useParams } from "react-router-dom";

interface HeaderProps {
  readonly value: string;
  readonly type?: "Template" | "Instance";
}

export const Header = ({ value, type = "Template" }: HeaderProps) => {
  const location = useLocation();
  const { templateId } = useParams();
  const { control: templateControl } = useFormContext<TemplateFormData>();
  const { control: instanceControl } = useFormContext<InstanceFormData>();

  const templateNameLive = useWatch<TemplateFormData>({
    name: "basicInformation.name",
    control: templateControl,
  });

  const instanceNameLive = useWatch<InstanceFormData>({
    name: "basicInformation.name",
    control: instanceControl,
  });

  const helperText = () => {
    if (
      location.pathname.includes("/templates/create") ||
      location.pathname.includes("/templates/edit")
    ) {
      if (location.pathname.includes("/create")) {
        return `Creating ${type} ${templateNameLive ?? ""}`;
      } else if (location.pathname.includes("/edit")) {
        return `Editing ${type} ${templateNameLive ?? ""}`;
      } else if (templateId) {
        return `Viewing ${type} ${templateNameLive ?? ""}`;
      }
    } else if (
      location.pathname.includes("/instances/create") ||
      location.pathname.includes("/instances/edit")
    ) {
      if (location.pathname.includes("/create")) {
        return `Creating ${type} ${instanceNameLive ?? ""}`;
      } else if (location.pathname.includes("/edit")) {
        return `Editing ${type} ${instanceNameLive ?? ""}`;
      } else if (templateId) {
        return `Viewing ${type} ${instanceNameLive ?? ""}`;
      }
    }
  };

  return (
    <div className="flex justify-between items-end">
      <div className="flex flex-col">
        <span className="text-sm italic">{helperText()}</span>
        <h1 className="text-xl font-semibold text-gray-900 tracking-wide">
          {value}
        </h1>
      </div>
    </div>
  );
};
